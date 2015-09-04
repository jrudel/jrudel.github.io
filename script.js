function showIt()
{
 var osel = document.getElementById("sel1");
 var ote = document.getElementById("op1");
 ote.innerText = "Your chosen option is: "+osel.value;
 if(osel.selectedIndex === 0)
   {
     document.getElementById("swoop").innerHTML = '<iframe src="https://www.youtube.com/embed/IK3bG1OQeLw" frameborder="0" allowfullscreen></iframe>';
   }
 else if(osel.selectedIndex === 1)
   {
     document.getElementById("swoop").innerHTML = '<iframe src="https://www.youtube.com/embed/xCNSwbanIVA" frameborder="0" allowfullscreen></iframe>';
   }
}
