nombre_container="sec_web_db"
existe_container=$(docker ps -a --filter "name=^/${nombre_container}$" --format "{{.Status}}")

if [ -z "$existe_container" ]; then
  docker run --name $nombre_container -e POSTGRES_PASSWORD=pepita -d -p 5432:5432 postgres 
  sleep 5 # por si acaso
  cat ./setup_db.sql | docker exec -i $nombre_container psql -U postgres -d postgres
elif [[ "$existe_container" == *"Exited"* ]]; then
  docker start $nombre_container
fi