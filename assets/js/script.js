
//JS Spread Operatörleri

// const urun = {
//     id: 1,
//     name: "Casper Bilgisayar",
//     category: {
//         id:1,
//         name: "Bilgisayar"
//     },
// }

// const guncelUrun = {
//     ...urun,
//     fiyat:25000,
//     stok:500
// }

// console.log(guncelUrun);

// const initialData ={
//     title: "Furkan Özay",
//     description: "Boş Yazılımcı"
// }

// const comingData = {
//     description:"Dolu Yazılımcı"
// }

// const enGuncelVerı = {...initialData,...comingData};
// console.log(enGuncelVerı);  //Burada en güncel gelecek olan bilgi en sağ yazdığımızdır çakışan bilgilerde en sağa yazdığımızdır.
//Ama birbiriyle alakası olamyan çakışmayan datalar üstüne ekler


// const dizi1 = [1,2,3,4];
// const dizi2 = [1,2,3,4];

// console.log(dizi1 == dizi2); //Bilgisayar dilinde bu iki obje aynı değil
//

//JS Rest Operatör

// function sum(...theArgs) {
//     let total = 0;
//     for (const arg of theArgs) {
//       total += arg;
//     }
//     return total;
//   }
  
//   console.log(sum(1, 2, 3));
//   // Expected output: 6
  
//   console.log(sum(1, 2, 3, 4));
//   // Expected output: 10

//Array Methods

// const dizi = Array.from({length: 5})
// console.log(dizi);

// const yeniDizi = dizi.map((eleman, index) => eleman = index +1)

// console.log(yeniDizi);

// const dizi = [10, "Furkan", "Frontend Sınıfı", true];

// for (const eleman of dizi) {

//     console.log(eleman);
    
// }

//Bunun yerine foreach

// dizi.forEach(eleman => console.log(eleman)) // for ofa göre daha kısa

// const yeniDizi = dizi.map(eleman => eleman = "Artık Hepsi Böyle oldu");

// console.log(yeniDizi);

//FİND OBJENİN İÇİNDE NE KADAR OLURSA OLSUN ARATTIĞIN ŞEYİN SADECE BİR TANESİNİ GETİRİR FİLTER HEPSİNİ

// const urunler = [
//     {
//         adi:"Bilgisayar",
//         fiyat:38000
//     },
//     {
//         adi:"Ayakkabı",
//         fiyat:5000
//     },
//     {
//         adi:"Telefon",
//         fiyat:12000
//     }
// ]

// const arananUrunler = urunler.filter(urun => urun.fiyat <= 10000);

// console.log(arananUrunler); 
//Find bulana kadar arar elemanları filter bulduğunu getirir

const studentBtns = document.querySelector(".studentBtns");
const studentBtns2 = document.querySelector(".studentBtns2");
const studentBtns3 = document.querySelector(".studentBtns3");
const studentDiv = document.querySelector(".studentDiv");

async function getData(){
    const request = await fetch("/assets/json/data.json");
    const data = await request.json();
    return data;
}

async function init(){
    const data = await getData();
   
    const currentYear = new Date().getFullYear();
   
    const gelenOgrenciler = data.ogrenciler.map(ogrenci => {
        const yas = currentYear - ogrenci.dogumYili;
        return { ...ogrenci, yas };
    });
    console.log(gelenOgrenciler);
   
    const bigStudents = gelenOgrenciler.filter(ogrenci => ogrenci.yas > 22);
    const smallStudents = gelenOgrenciler.filter(ogrenci => ogrenci.yas < 22);

    studentBtns.addEventListener("click", function(e){
        e.preventDefault();
        studentDiv.innerHTML = "";
        bigStudents.forEach(student => {
            studentDiv.innerHTML += `
                    <h2>${student.adiSoyadi}</h2>
            `;
        });
    });

    studentBtns2.addEventListener("click", function(e){
        e.preventDefault();
        studentDiv.innerHTML = "";
        smallStudents.forEach(student => {
            studentDiv.innerHTML += `
                    <h2>${student.adiSoyadi}</h2>
            `;
        });
    });

    studentBtns3.addEventListener("click", function(e){
        e.preventDefault();
        studentDiv.innerHTML = "";
        const equalStudents = gelenOgrenciler.filter(ogrenci => ogrenci.yas === 22);
        if(equalStudents.length > 0){
            equalStudents.forEach(student => {
                studentDiv.innerHTML += `
                    <h2>${student.adiSoyadi}</h2>
                `;
            });
        } else {
            studentDiv.innerHTML = `<h1>Böyle bir öğrenci yok birader</h1>`;
        }
    });
}

init();

