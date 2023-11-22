#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <LiquidCrystal_I2C.h>


#define SDA_PIN 5   // Chân SDA kết nối với D5 trên ESP32
#define RST_PIN 32  // Chân RST kết nối với D32 trên ESP32

const char *ssid = "Ngo_tan_";
const char *password = "87654321";                             
const char *serverUrl = "http://172.20.10.2:3002/balance/deduct";



MFRC522 mfrc522(SDA_PIN, RST_PIN);   
LiquidCrystal_I2C lcd(0x27, 16, 2); 
String type = "moto";

void displayMessage(String message, bool stay = false)
{
  lcd.clear(); 
  lcd.setCursor(0, 0);
  lcd.print(message); 
  if(stay)
    return;
  delay(1000);
  lcd.clear();
  
  lcd.setCursor(0, 0); 
  lcd.print(type);
}

HTTPClient http; 

void setup() {  
  Serial.begin(115200);
  SPI.begin();         // Khởi động giao tiếp SPI
  mfrc522.PCD_Init();  // Khởi động mô-đun RC522
  Serial.println("Ready to read RFID cards...");

  // Kết nối Wi-Fi
  WiFi.begin(ssid,password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  
  lcd.init();                      // Khởi động màn hình LCD
  lcd.backlight();                 // Bật đèn nền
}

void loop() {
  // Kiểm tra nếu có thẻ RFID ở gần
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    displayMessage("Processing", true);
    String cardID = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      cardID += (mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
      cardID += String(mfrc522.uid.uidByte[i], HEX);
    }

    StaticJsonDocument<128> jsonDoc;
    jsonDoc["cardID"] = cardID;  // Thay "your_card_uid" bằng giá trị UID từ thẻ RFID
    jsonDoc["serviceName"] = type;

    String jsonStr;
    serializeJson(jsonDoc, jsonStr);
    Serial.println(jsonStr);
    Serial.println(serverUrl);
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(jsonStr);

    // Kiểm tra kết quả của API và hiển thị trên LCD
    if (httpResponseCode == 200) {
      Serial.println("Success");
      displayMessage("Success");
    } else if (httpResponseCode == 404) {
      Serial.println("User Unrecognized");
      displayMessage("User Unrecognized");
    } else if (httpResponseCode == 403) {
      Serial.println("Low balance");
      displayMessage("Low balance");
    } else if (httpResponseCode == 405) {
      Serial.println("Service not found");
      displayMessage("Service not found");
    } else if (httpResponseCode == 500) {
      Serial.println("Server error");
      displayMessage("Server error");
    } else {
      Serial.print("API call failed, HTTP response code: ");
      Serial.println(httpResponseCode);
      displayMessage("API call failed: " + String(httpResponseCode));
    }

    http.end();

    // Tạm dừng để tránh đọc liên tục cùng một thẻ
    delay(1000);
  }
}

