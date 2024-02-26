const joi=require("joi");

const validation=joi.object({
    name:joi.string().min(2).max(15).required(),
    google_map_location:joi.string().min(2).required(),
    img:joi.string().required(),
    infrastructure:joi.string().min(5),
    review:joi.string().min(5),
    state:joi.string().min(5),
    rating:joi.number().max(10).required(),
    userData:joi.string()
})

module.exports=validation