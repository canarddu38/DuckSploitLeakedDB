function search() 
{
	query = window.location.search;
	
	fetch('https://dsleaks-db-default-rtdb.firebaseio.com/databases.json')
	 .then(response => response.text())
	 .then(data => {
		var dbs = data;
		
		const map = new Map(Object.entries(JSON.parse(dbs)));
		map.forEach((_value, key) => {
			const map2 = new Map(Object.entries(map.get(key)));
			map2.forEach((_value, key2) => {
				console.log("New key:"+key2+":"+map2.get(key2)+" from:"+key);
			})
			// url="./download.html?id="+id
			// document.getElementById("recentapps").innerHTML += 
			// "<a href='"+url+"' target='_blank' rel='noreferrer noopener' class='streapp-link'><div class='streapp-container1'><img alt='image' src='"+imageurl+"' class='streapp-image'><span class='streapp-text'><span>"+title+"</span></span></div></a>";
		})
		
	})
}
function upload() 
{
	
	domain = document.getElementById("domain").value;
	data = document.getElementById("database").value;
	
	dbname = domain.replace(".", "_dot_");
	var arr = data.split("\n");
	
	var arrayLength3 = arr.length;
	tg=0;
	i4=0;
	const chuncks = new Map();
	for (var i3 = 0; i3 < arrayLength3; i3++) 
	{
		if (i4<10)
		{
			chuncks[tg] = chuncks[tg]+"_new_"+arr[i3];
		}
		else
		{
			newaccounts = "\"test\": \"KnBLpKfobLybzDqiqKYo\", ";
			arr2 = chuncks[tg].split("_new_");
			arrayLength = arr2.length;
			for (var i = 0; i < arrayLength; i++) 
			{
				acc = arr2[i].split(":");
				if (acc[0] != "undefined")
				{
					if (acc[0].includes("@"))
					{
						acc[0] = acc[0].replace("@", "_at_");
						acc[0] = acc[0].replace(".", "_dot_");
						acc[1] = acc[1].replace(".", "_dot_");
						if (i==0)
						{
							newaccounts = newaccounts+"\""+acc[0]+"\":\""+acc[1]+"\"";
						}
						else
						{
							newaccounts = newaccounts+", \""+acc[0]+"\":\""+acc[1]+"\"";
						}
					}
					else
					{
						e=i+1;
						alert("Error, misplaced email:"+e);
					}
				}
			}
			
			
			var url = "https://dsleaks-db-default-rtdb.firebaseio.com/databases/"+dbname+".json";

			var xhr = new XMLHttpRequest();
			xhr.open("PATCH", url);

			xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");

			xhr.onreadystatechange = function () {
			   if (xhr.readyState === 4) {
				  console.log(xhr.status);
				  console.log(xhr.responseText);
			   }};
			
			var data = "{"+newaccounts+"}";
			xhr.send(data);
			console.log(data);
			
			
			i4=0;
			tg++;
			
		}
		i4++;
	}
}