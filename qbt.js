

function resetTool(fm){

    //to test search for "for testing" and comment/uncomment
    
    //globals
    qp_tot_tries=0;
    qp_accuracy=0;
    qp_tot_correct=0;
    
    gs_tot_tries=0;
    gs_accuracy=0;
    gs_tot_correct=0;
    
    
        
    diff=0;    
    msg1 = document.getElementById("msg_l");
    msgr = document.getElementById("msg_r");
    msgdiff = document.getElementById("differential");
    msg1.className = "hidden";
    msgr.className = "hidden";
 }
 resetTool();


 function prepTool(fm){    
    msg1.className = "hidden";
    msgr.className = "hidden";
    fm.rand.value = ""; //for testing: comment out
    setTimeout("runTool(document."+fm.name+")",300);
    return false;
 }

 
 function runTool(fm) {
    //validation
    if (fm.predict.selectedIndex == 0) {
        alert("Please make a prediction...");
        fm.predict.focus(); 
        return false;       
    }
    if ( ! fm.predtype[0].checked && ! fm.predtype[1].checked) {
        alert("Please tell the Tool whether you are Quantum Predicting or Guessing...");
        return false;
    }
    
    //show random number    
        
    var r = getRand(); //for testing: comment out
    //var r = fm.rand.value; //for testing: uncomment 
     
    //prevent showing 0
    while (r < 1) {   
        r = getRand();
    }
   
    fm.rand.value = r; //for testing: comment out
    
   
    //score
    
    if (fm.predict[fm.predict.selectedIndex].value == r) {
            msg1.innerHTML = "CORRECT";
            msg1.className = "msg_correct";
            msgr.innerHTML = "CORRECT";
            msgr.className = "msg_correct";        
        if (fm.predtype[0].checked) {
            //total correct QP's
            qp_tot_correct ++;
            fm.qp_tot_correct.value = qp_tot_correct;
        } else if (fm.predtype[1].checked) {
            //total correct Guess
            gs_tot_correct ++;
            fm.gs_tot_correct.value = gs_tot_correct;
        }
       
    } else {
        msg1.innerHTML = "INCORRECT";
        msg1.className = "msg";
        msgr.innerHTML = "INCORRECT";
        msgr.className = "msg";    
    }
    
    
    
    //stats    
    
     if (fm.predtype[0].checked) {
        //QP's
        //total tries
        qp_tot_tries ++;
        fm.qp_tot_tries.value = qp_tot_tries;      
        //% accuracy 
        qp_accuracy = (qp_tot_correct / qp_tot_tries) * 100;
        fm.qp_accuracy.value = roundOff(qp_accuracy,2);
     } else if (fm.predtype[1].checked) {
        //Guess
        //total tries
        gs_tot_tries ++;
        fm.gs_tot_tries.value = gs_tot_tries;        
        //% accuracy 
        gs_accuracy = (gs_tot_correct / gs_tot_tries) * 100;
        fm.gs_accuracy.value = roundOff(gs_accuracy,2);
     }
     
     //diff
     
     if ((qp_accuracy > gs_accuracy) && gs_tot_tries > 0) {        
        diff = (qp_accuracy - gs_accuracy)  / (gs_accuracy / 100);        
        if (diff == "Infinity") { diff = 100; }
        fm.diff.value = roundOff(diff,0);
        msgdiff.innerHTML = "in favour of QP";
     } else if ((gs_accuracy > qp_accuracy) && qp_tot_tries > 0) {        
        diff = (gs_accuracy - qp_accuracy)  / (qp_accuracy / 100);        
        if (diff == "Infinity") { diff = 100; }
        fm.diff.value = roundOff(diff,0);
        msgdiff.innerHTML = "in favour of Guessing";
     } else {
        fm.diff.value = "";
        msgdiff.innerHTML = "";
     }
   
    return false;
 }
 
 function getRand(){
    var r = Math.round(Math.random() * 10);
    return r;    
 }
 
 function clearRand(){
    document.qform.rand.value = "";
    msg1.className = "hidden";
    msgr.className = "hidden";
 }
 
 function roundOff(number,places){
    var s = number.toString();    
    var sp = s.split('.');    
    if (sp[1]){    
    	var num_decimals = sp[1].length;    
    	if (num_decimals > places){    
    		var cut_by = num_decimals - places;    
    		number = s.slice(0,-cut_by);    
    		if (sp[0] == ""){
    			number = 0 + number;
    			}		
    		}
    	}
    if (isNaN(parseFloat(number))){
    	return "enter a number";
    	}
    	else{
    	return parseFloat(number);
    	}
   }
 

