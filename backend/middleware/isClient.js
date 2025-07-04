import Client from "../models/client.model.js";

const isClient = async (req, res, next) => {
    const {id} = req.body; 
    try {
        const client = await Client.findById(id); 
        
        if(!client){
            return res.status(404).json({
                success: false, 
                message: "Not a client"                
            }); 
        }

        next(); 
    } catch (error) {
        return res.status(500).json({
      success: false,
      message: "Server Error in isClient middleware",
    });
    }
}

export default isClient; 