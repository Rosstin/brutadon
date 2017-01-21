function logData(){

    d3.tsv("BRUTADON_EVENTS - Sheet1.tsv", function(data) {
      console.log(data[0]);
      console.log(data[1].prompt);
      console.log(data[2]);
    });

}


