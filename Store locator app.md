# Store Locator Web App

This application supports the following functionalities:

* Firstly, the user shares their location.

* Next.js app sends the coordinates to PostgreSQL.

* PostgreSQL uses a spatial query (e.g., ST_Distance) to find the 5 closest points.

* Finally, the results are displayed on Leaflet component.

## Defined Tasks

1. Get data -> **done**
    * Download features of cafe location in HoChiMinh city using overpass-turbo https://overpass-turbo.eu/:
    ```
    node["amenity"="cafe"](10.3751, 106.3622, 11.1604, 107.0273);
    out body;
    ```
    * Export the result as geojson file

2. Work with Postgre SQL -> **done**
    * Open pg Admin and create database, schema and table to store cafe features
    * Create map_features_db: `CREATE DATABASE map_features_db;`
    * Install PostGIS extension for the database: `CREATE EXTENSION IF NOT EXISTS postgis;`
    * However, it is failed then we need to install PostGIS extension using Application Stack Builder to install it first.

    * Check PostGIS version: `SELECT postgis_full_version();`

    * Create schema: `CREATE SCHEMA features;`
    * Create table with Postgis GEOGRAPHY data:
    ```
    CREATE TABLE features.cafe (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    node_id TEXT,
    name TEXT,
    phone TEXT,
    geom GEOGRAPHY(Point, 4326)
    );
    ```

    * Note that, it creates a `geom` column with GEOGRAPHY data structure which is faster for GIS operation

    * Create index: `CREATE INDEX idx_locations_geom ON features.cafe USING GIST (geom);`
    * GIST mechanism: apply R-Tree to data when insert it to DB

3. Insert data to Postgre SQL -> **done**
    * Read geojson file using javascript
    * Extract features and insert to Postgre db: `map_features_db`, scheme: `features`, table: `cafe`

4. Build app with Nextjs -> **done**


5. Display data to leaflet -> **done**



## PostgreSQL:

Hierarchy: Server -> Database -> Schema -> Table

* List all database: `SELECT datname from pg_database;`


## Next.js

* `const [state, setState] = React.useState(initialValue);`
    * `React.useState` returns a pair of current value and a function to update that value
    * `setState()` will set new value and **notify React to automatically update UI** that use the value 

* `React.useEffect(function, dependencies);`
    * It tells React to run a function after finished painting the UI
    * **Run once on Mount**: if dependencies is an empty array, the effect run only once when the component first appears:
    ```
    useEffect(() => {
        fetchCafes();
    }, []);
    ```

    * **Run on update**: if you put variable inside dependencies array, the effect run anytime the variable changed
    ```
    useEffect(() => {
        fetchCafes(center.lat, center.lng);
    }, [center]); // Runs whenever 'center' changes
    ```

    * **Cleanup**: if you return a function in the end of useEffect, that function is called to cleanup
    ```
    useEffect(() => {
        // Initialize map
        const map = L.map('map-container').setView([10.7, 106.6], 13);

        return () => {
            // Cleanup: Completely destroy the map instance
            map.remove();
        };
    }, []);
    ```