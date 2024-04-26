# Store workspace public IP to config file
IP_VAR="https://qkart.backend.projects.api.veekshith.dev"
CONFIG='{"workspaceIp": "'"$IP_VAR"'"}'
echo $CONFIG > src/ipConfig.json