nx serve order-service --verbose
nx serve payment-service --verbose

nx g @nx/nest:lib libs/order

curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":"p1","quantity":2}]}' 

npx typeorm migration:create apps/order-service/src/infrastructure/database/postgres/migrations/CreateOrderTable
npx typeorm migration:run -d apps/order-service/src/infrastructure/database/postgres/ormconfig.ts
npx typeorm migration:revert -d apps/order-service/src/infrastructure/database/postgres/ormconfig.ts


npx ts-node --project tsconfig.base.json apps/order-service/src/infrastructure/database/postgres/migration-run.ts
