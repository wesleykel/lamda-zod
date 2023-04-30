const z = require("zod");

const mySchema = z.object({
  name: z.string(),
  age: z.number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  })
});

module.exports.handler = async (event) => {
  const parsedBody = JSON.parse(event.body);
  console.log(typeof event);
  try {
    mySchema.parse(parsedBody);
  } catch (error) {
    //console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          input: error,
        },
        null,
        2
      ),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
