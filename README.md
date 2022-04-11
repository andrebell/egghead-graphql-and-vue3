# GraphQL Powered Vue 3 Application

This is my repository for the Egghead Course "Create a GraphQL Powered Vue 3 Application" from Kevin Cunningham (@doingandlearning).

1. I forked his [repository](https://github.com/doingandlearning/egghead-graphql-and-vue3) from GitHub. 
2. I added .devcontainer to work in a remote developmemt container with VS Code
3. The course uses a MongoDB as part of it's backend. I chose to run this in docker containers by

```bash
$ docker network create backend
$ docker run --rm -d --network backend --name mongodb -p 27017:27017 mongo
```

4. In his course Kevin uses Robo 3T as frontend to see the MongoDB. I prefer mongo-express, which I run by

```bash
$ docker run --rm -d --network backend --name mongo-express -p 8081:8081 -e ME_CONFIG_MONGODB_SERVER=mongodb mongo-express
```

5. Access the MongoDB frontend with `http://localhost:8081`
6. I changed the MongoDB setting in graphql-backend/src/index.js (line 16...) to

```javascript
mongoose
  .connect("mongodb://mongodb/mysurfshop")
  .then(() => console.log("Mongodb connected.."))
  .catch((err) => console.log(err));
```

7. I used yarn to manage the dependencies
8. Using a mutation to update a craft always failed for me. I had to comment line 53 in graphql-backend/src/controllers/craftController.js to disable the timeout. After this it worked perfectly.

```javascript
// Update an existing craft
exports.updateCraft = async (request, reply) => {
  try {
    const id = request.params ? request.params.id : request.id;
    const fields = request.body ? request.body : request;
    // await new Promise((resolve, reject) => setTimeout(reject, 2000));  <== Disabled this statement
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const update = await Craft.findByIdAndUpdate(id, fields, { new: true });
    return update;
  } catch (error) {
    throw boom.boomify(error);
  }
};
```

9. Later in the course it becomes clear that these timeouts are added on purpose.
