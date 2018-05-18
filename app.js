//Main app
var nametag= document.getElementById("name");
var rollnotag = document.getElementById("rno");
var ratingtag= document.getElementById("rating");
var commenttag= document.getElementById("comment");

nametag.value= "";
rollnotag.value = "";
ratingtag.value= "";
commenttag.value= "";

var edit = 0;
var etemp;

var storage = [];


var list = document.querySelector('.menteearea');

storage = JSON.parse(localStorage.getItem("save"));

if(storage!=null){
  for(var i=0; i<storage.length;i++)
  {
    var load = "<div class='mentee'><div class='menthead clearfix' style='background:"+defcolor(storage[i].rating)+"'><div class='namedis'>" + storage[i].name + "</div><div class='edetails'><span class='rate'>"+storage[i].rating+"</span><i class='fa fa-star'></i><i class='fa fa-trash'></i></div></div><div class='odetails hidden'><div class='rono'>"+storage[i].roll+ "</span><i class='fa fa-edit'></i></div><div class='comments'>"+storage[i].comment+"</div></div></div>";
    list.innerHTML += load;
  }
}
else storage=[];


// pop up & adding

var pop = document.getElementById('new');
var btn = document.getElementById('add');
var srtbtn = document.getElementById('sort');
var closebtn = document.getElementById('formclose');
var addform = document.forms['mentform'];

btn.onclick = function(){
	pop.style.display = 'block';

}

addform.addEventListener('submit',function(e){
	e.preventDefault();
	if(edit == 0){
		var name = nametag.value; //why .textcontent does not work?
		var rollno = rollnotag.value;
		var rating = ratingtag.value;
		var comment = commenttag.value;
		//making it back to 0
		nametag.value= "";
		rollnotag.value = "";
		ratingtag.value= "";
		commenttag.value= "";

		//creating elements
		var rate = document.createElement('span');
			rate.className = 'rate';
			 rate.textContent = rating;
		var istar = document.createElement('i');
			istar.classList.add('fa');
			istar.classList.add('fa-star');
		var itrash = document.createElement('i');
			itrash.classList.add('fa');
			itrash.classList.add('fa-trash');

		var extradet = document.createElement('div');
			extradet.className = 'edetails';
		var namearea = document.createElement('div');
			namearea.className = 'namedis';
				namearea.textContent = name;
		var toparea = document.createElement('div');
			toparea.classList.add('menthead');
			toparea.classList.add('clearfix');

		var rolno = document.createElement('span');
			rolno.className = 'rollno';
				rolno.textContent = rollno;
		var iedit = document.createElement('i');
			iedit.classList.add('fa');
			iedit.classList.add('fa-edit');
		
		var rollarea = document.createElement('div');
			rollarea.className = 'rono';
		var commentarea = document.createElement('div');
			commentarea.className = 'comments';
				commentarea.textContent = "\""+comment+"\"";
		var otherdet = document.createElement('div');
			otherdet.classList.add('odetails');
			otherdet.classList.add('hidden');

		var cover = document.createElement('div');
	 		cover.className = 'mentee';

	 	switch(rating){
	 		case '0': toparea.setAttribute('style','background: #f70804');break;
	 		case '1': toparea.setAttribute('style','background: #f7ba04');break;
	 		case '2': toparea.setAttribute('style','background: #f7e604');break;
	 		case '3': toparea.setAttribute('style','background: #eeff00');break;
	 		case '4': toparea.setAttribute('style','background: #5da801');break;
	 		case '5': toparea.setAttribute('style','background: #8bfc00');break;
	 		default :break;
	 	}

	 	//appending
	 		extradet.appendChild(rate);
	 		extradet.appendChild(istar);
	 		extradet.appendChild(itrash);
	 	toparea.appendChild(namearea);
	 	toparea.appendChild(extradet);
	 		rollarea.appendChild(rolno);
	 		rollarea.appendChild(iedit);
	 	otherdet.appendChild(rollarea);
	 	otherdet.appendChild(commentarea);

	 	cover.appendChild(toparea);
	 	cover.appendChild(otherdet);
	 	

	 	list.appendChild(cover);

	 	store();
 	}

 	if(edit == 1){
 			etemp.target.parentElement.parentElement.previousElementSibling.children[0].textContent = nametag.value;
			etemp.target.previousElementSibling.textContent = rollnotag.value;
			etemp.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent = ratingtag.value;
			etemp.target.parentElement.nextElementSibling.textContent = commenttag.value;

			switch(ratingtag.value){
	 		case '0': etemp.target.parentElement.parentElement.previousElementSibling.style.background = '#f70804';break;
	 		case '1': etemp.target.parentElement.parentElement.previousElementSibling.style.background = '#f7ba04';break;
	 		case '2': etemp.target.parentElement.parentElement.previousElementSibling.style.background = '#f7e604';break;
	 		case '3': etemp.target.parentElement.parentElement.previousElementSibling.style.background = '#eeff00';break;
	 		case '4': etemp.target.parentElement.parentElement.previousElementSibling.style.background = '#5da801';break;
	 		case '5': etemp.target.parentElement.parentElement.previousElementSibling.style.background = '#8bfc00';break;
	 		default :break;

	 		}

	 		nametag.value= "";
			rollnotag.value = "";
			ratingtag.value= "";
			commenttag.value= "";

			edit = 0;

			store();
 	}

 	pop.style.display = 'none';
 	



})

closebtn.onclick = function(){
	pop.style.display = 'none';
}

window.onclick = function(e){
	if(e.target == pop){
		pop.style.display = 'none';
	}
}

// popup ends



list.addEventListener('click',function(e){

	//deleting

	if(e.target.className == 'fa fa-trash'){
		var del = e.target.parentElement.parentElement.parentElement;



		e.target.parentNode.parentNode.parentNode.parentNode.removeChild(del);
		store();


	}

	//toggling

	if(e.target.className == 'namedis'){
		e.target.parentElement.nextElementSibling.classList.toggle('hidden');
	}

	//editing

	if(e.target.className == 'fa fa-edit'){
		pop.style.display = 'block';
		edit = 1;
		etemp = e;
		nametag.value= e.target.parentElement.parentElement.previousElementSibling.children[0].textContent;
		rollnotag.value = e.target.previousElementSibling.textContent;
		ratingtag.value= e.target.parentElement.parentElement.previousElementSibling.children[1].children[0].textContent;
		commenttag.value= e.target.parentElement.nextElementSibling.textContent;

		//goto add
		
	}

	


})

function comp(x,y){
	if(x.rating<y.rating)	return 1;
	if(x.rating>y.rating)	return -1;

	else return 0;
}

srtbtn.onclick= function(){
	storage.sort(comp);
	localStorage.clear();
	storage=[];
	localStorage.setItem("save", JSON.stringify(storage));
	window.location.reload();

}


function store(){
	localStorage.clear();
	storage=[];
	for(var i=0;i<Array.from(list.children).length;++i)
		{	storage[i]={name:"",rating:"",roll:"",comment:""};
			storage[i].name = list.children[i].firstElementChild.firstElementChild.textContent;
			storage[i].rating = list.children[i].firstElementChild.children[1].firstElementChild.textContent;
			storage[i].roll = list.children[i].children[1].firstElementChild.firstElementChild.textContent;
			storage[i].comment = list.children[i].children[1].children[1].textContent;
		}

	
	localStorage.setItem("save", JSON.stringify(storage));
}

function defcolor(rtemp){
	switch(rtemp){
	 		case '0': return '#f70804';break;
	 		case '1': return '#f7ba04';break;
	 		case '2': return '#f7e604';break;
	 		case '3': return '#eeff00';break;
	 		case '4': return '#5da801';break;
	 		case '5': return '#8bfc00';break;
	 		default : return '#333';break;

	 		}
}