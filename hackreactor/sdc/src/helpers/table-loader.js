const loadRelated = () => {
  const tableName = 'photos';
  var allRows = [];

  let stream = fs.createReadStream('../data/photos.csv');

  const queryString = '\COPY photos (styleId, url, thumbnail_url) FROM "../data/photos.csv" WITH DELIMITER "," CSV HEADER';

  let csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      allRows.push(data);
    })
    .on('end', () => {
      allRows.shift();
      pool.connect((err, client) => {
        if (err) {
          console.log(err)
        }

        try {
          allRows.forEach(row => {
            client.query(queryString, row, (err, result) => {
              if (err) {
                console.log(err)
              } else {
                console.log('inserted', result.rowCount + 'row', row)
              }
            })
          })
        } finally {
          done()
        }
      })
    })

  stream.pipe(csvStream);
};


const stylesLoad = `\COPY styles (id, product_id, name, original_price, sale_price, default_value) from './styles.csv' DELIMITER ',' CSV HEADER` ;

pool.query(stylesLoad, (err, result) => {
  if (err) {
    console.log(result)
  } else {
    console.log(result)
  }
})