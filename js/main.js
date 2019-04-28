
//This code is completely fucked just look away

var incnum = 0
function StartAddition(tx,before) {
  incnum++
  var fcont = document.createElement('div');
  fcont.id = "cont"+incnum
  fcont.className = "indcont"
  var main = document.getElementById('main')
  if (before == 1) {
    main.insertBefore(fcont, main.childNodes[0]);
  }
  else {
    main.appendChild(fcont)
  }
  console.log(document.getElementsByClassName('indcont'));

  var iframe = document.createElement('iframe');
  iframe.src = "http://arweave.net/"+tx;
  document.getElementById("cont"+incnum).appendChild(iframe)
}



async function BlockHeight(){
  const response = await fetch("http://arweave.net/info");
  const data = await response.json();
  return data;
}

async function TxFromBlock(block){
  const response = await fetch('http://arweave.net/block/height/'+block);
  const blockdata = await response.json();
  return blockdata;
}
function TransformTrans(txs) {
  i = 0
  for (i=0; i < txs.length; i++) {
    console.log(txs[i]);
    StartAddition(txs[i],1)
  }
}

function MakeItHappen() {
  BlockHeight().then(data => {
    TxFromBlock(data.height).then(blockdata => {
      TransformTrans(blockdata.txs)
    });
  });
}

function MakeItHappenCustom() {
  blocknum = document.getElementById('inputblock').value
  console.log(blocknum)
  TxFromBlock(blocknum).then(blockdata => {
      TransformTrans(blockdata.txs)
    });
}

txlist = []
function TransformTrans2(txs) {
  i = 0
  if (txs.length == 0) {
    return null
  }
  for (i=0; i < txs.length; i++) {
    /*console.log(txs[i]);
    txlist.push(txs[i])
    StartAddition(txs[i])
    console.log(txlist)*/
    console.log(txs[i])
    return txs[i];
  }
}
globali = 0
function GetLatest(numof) {
  BlockHeight().then(data => {
      /*we don't need to fetch the current height!!! Fix later */

      TxFromBlock(data.height - globali).then(data => {
        if (txlist.length < numof) {
          if (TransformTrans2(data.txs) == null) {
            console.log("skipping, blank");
            globali++;
            GetLatest(numof);
            console.log(txlist)
            }
          else {
            txlist.push(TransformTrans2(data.txs));
            StartAddition(TransformTrans2(data.txs),0);
            globali++;
            GetLatest(numof);
            }
          }
        else {
          console.log("done!")
          }

        });
      console.log(globali);
      });
};


GetLatest(100)
console.log(txlist)
