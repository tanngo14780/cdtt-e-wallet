export default function Edituser(){

    return(
        <div>
            <div>
                <label htmlFor="balance">Số dư</label>
                <input type="text" name="balance" id="balance" />
            </div>
            <div>
                <label htmlFor="tuition">Học phí</label>
                <input type="text" name="tuition" id="tuition" />
            </div>
        </div>
    );
}
