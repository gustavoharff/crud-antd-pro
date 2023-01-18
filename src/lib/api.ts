import { createServer } from "miragejs";
import { User } from "../models/user";
import faker from "faker";

const users: User[] = Array.from({ length: 74 }, (_, i) => ({
  id: i + 1,
  name: faker.name.firstName(),
  email: faker.internet.email().toLowerCase(),
  tags: [faker.lorem.words(1)],
  createdAt: faker.date.past().toISOString(),
  reputation: Math.random() * 5
}));

let server = createServer({});

function paginate(array: Array<any>, page_size: number, page_number: number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

server.get("/api/users", (schema, request) => {
  console.log(request.queryParams);

  const page = request.queryParams.current;
  const pageSize = request.queryParams.pageSize;

  let items = users;

  if (request.queryParams.id) {
    items = items.filter((item) => item.id === Number(request.queryParams.id));
  }

  if (request.queryParams.name) {
    items = items.filter((item) =>
      item.name
        .toLowerCase()
        .includes(request.queryParams.name.toLocaleLowerCase())
    );
  }

  return {
    data: paginate(items, Number(pageSize), Number(page)),
    total: items.length,
  };
});
