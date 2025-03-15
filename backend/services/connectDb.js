import mongoose from "mongoose";
import figlet from "figlet";

async function Db_Connect(db_URI) {
    try {
        await mongoose.connect(db_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        figlet("D a t a b a s e  C o n n e c t e d . . .", (error, data) => {
            if (error) {
                console.log("Something went wrong in figlet...");
                return;
            }
            console.log(data);
        });
    } catch (error) {
        figlet("F a i l e d   t o   C o n n e c t   D a t a b a s e . . .", (error, data) => {
            if (error) {
                console.log("Something went wrong in figlet...");
                return;
            }
            console.log(data);
        });
    }
}

export default Db_Connect;