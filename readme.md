The application scales websockets connections

currently there are two servers that are handling the load and are behind haproxy that is running as a load balancer.

To run the application use

```docker-compose up -d --build```

To create connections use localhost:5173/. It will show the connections count and respective server

To view all the connections that are currently open to each server go to localhost:5173/all

Note:

  -> Application uses server sent events to update the information at /all
  -> Info will be updated at every 3 seconds.
  