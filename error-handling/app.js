const express = require("express")
const app = express()
app.get("/" , (req,res)=>{
    throw new Error('Error Thrown')
}
)


// Async Exception Handling 

app.get("/asyncHandler" , async(req,res,next) =>{
    try{
        throw new Error('Async Error Demo')
    }
    catch(err){
        next(err)
    }
})

// Centralized Error Handler
function errorHandler(err,eq,res,next)
{
    console.error(err.stack)
    res.status(res.statusCode || 500).json({ error: err.message });
}


// Custom Error

class NotFoundError extends Error{
    constructor(msg){
        super(msg);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}
app.get('/custom', (req,res,next)=>{
    next(new NotFoundError('Resource Not Found'))
})
app.use(errorHandler);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

