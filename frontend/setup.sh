# Store workspace public IP to config file
IP_VAR="https://qkart-backend-json-server.onrender.com"
CONFIG='{"workspaceIp": "'"$IP_VAR"'"}'
echo $CONFIG > src/ipConfig.json