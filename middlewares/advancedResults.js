const { query } = require("express")

const advancedResults = (model, populate) => {
    return async (req, res, next) => {
        let Query = model.find()

        const page = Number(req.query.page) 
        const limit = Number(req.query.limit) 

        const skip = (page - 1) * limit
        const total = await model.countDocuments();
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        //populate
        if (populate) {
            Query = Query.populate(populate);
        }
    
        //Filtering/searching
    
        if (req.query.name) {
            Query = Query.find({
            name: { $regex: req.query.name, $options: "i" },
          });
        }
    
        //pagination results
        const pagination = {};
        //add next
        if (endIndex < total) {
          pagination.next = {
            page: page + 1,
            limit,
          };
        }
    
        //add prev
        if (startIndex > 0) {
          pagination.prev = {
            page: page - 1,
            limit,
          };
        }
    
        // //Execute query
        const data = await Query.find().skip(skip).limit(limit);
    
        res.results = {
          total,
          pagination,
          results: data.length,
          status: "success",
          message: "Teachers fetched successfully",
          data: data,
        }

        next()
    } 
}


module.exports = advancedResults