#!/bin/bash

directory="src"

# Check if directory exists
if [ ! -d "$directory" ]; then
    echo "Directory doesn't exist. Creating..."
    mkdir "$directory"
    cd "$directory" || exit 1  # Change directory if creation was successful
else
    echo "Directory already exists."
fi

# Create subdirectories within "App"
mkdir -p config assets components services hooks i18n models redux routes schema screens theme utils
# Create subdirectories within "assets"
mkdir -p assets/images assets/sounds assets/animations assets/icons assets/fonts

# Create index.ts files in subdirectories within "App"
touch config/index.ts components/index.ts services/index.ts hooks/index.ts i18n/index.ts models/index.ts redux/index.ts routes/index.ts schema/index.ts screens/index.ts theme/index.ts utils/index.ts

# Create placeholder files or directories in subdirectories within "assets"
touch assets/images/index.ts assets/sounds/index.ts assets/animations/index.ts assets/icons/index.ts assets/fonts/index.ts

cd ../ || exit 1
# Move App.tsx to src/
mv App.tsx src/
# Update import statement in index.js
# Overwrite index.js with the provided code
echo "/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);" > index.js

if [ $? -eq 0 ]; then
    echo "index.js updated successfully."
else
    echo "Failed to update index.js."
    exit 1
fi

echo "Setup completed successfully."
