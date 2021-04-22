const {Schema, model} = require(`mongoose`)
const userSchema = new Schema(
  {
    username: {type:String, required: true, unique: true},
    password: {type:String, required: true, unique: true},
    sports: [{type: Schema.Types.ObjectId, ref: `Sport`}]
  },
  {
    timestamps:true,
    versionKey: false
  }
);

module.exports = model(`User`, userSchema)