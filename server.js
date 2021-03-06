var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./public'));

if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
