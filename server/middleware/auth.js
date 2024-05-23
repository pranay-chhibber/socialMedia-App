import jwt from "jsonwebtoken";


//@ wants to like a post
//@ click the like buttton => auth middleware (next) => like controller ....
const auth = async (req,res,next) =>{
    try {
        const token = req.headers.Authorization.split(" ")[1];
        const isCustomAuth = token.lenght < 500;

        let decodedData ;

        if(token  && isCustomAuth){
            decodedData =  jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next()

    } catch (error) {
        console.log(error);
    }

}
export default auth