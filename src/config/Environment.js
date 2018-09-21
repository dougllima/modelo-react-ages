var env = process.env.NODE_ENV || "development";
var Environment = require("./config.json")[env];
export default Environment;
