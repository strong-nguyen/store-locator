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
    * Install PostGIS extension: CREATE EXTENSION IF NOT EXISTS postgis;
    * However, it is failed then we need to install PostGIS extension using Application Stack Builder to install it first.

    * Check PostGIS version: SELECT postgis_full_version();

    * Create schema: CREATE SCHEMA features;
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

    * Note that, it create a geom with GEOGRAPHY datastructure which is faster for GIS operation

    * Create index: `CREATE INDEX idx_locations_geom ON features.cafe USING GIST (geom);`
    * GIST mechanism: apply R-Tree to data when insert it to DB

3. Insert data to Postgre SQL -> **done**
    * Read geojson file using javascript
    * Extract features and insert to Postgre db: `map_features_db`, scheme: `features`, table: `cafe`

4. Build app with Nextjs -> **done**


5. Display data to leaflet -> **done**



## PostgreSQL:

Hierachy: Server -> Database -> Schema -> Table

* List all database: SELECT datname from pg_database;

