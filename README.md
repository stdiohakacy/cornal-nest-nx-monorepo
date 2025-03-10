nx serve order-service --verbose
nx serve payment-service --verbose

nx g @nx/nest:lib libs/order

curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":"p1","quantity":2}]}' 


nx run order-service:m:d
