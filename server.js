import express from 'express';
import { Liquid } from 'liquidjs';
import multer from 'multer';

// import { graphql, buildSchema } from 'graphql';

const app = express()

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')


const groupsRes = await fetch('https://fdnd-agency.directus.app/items/snappthis_group?fields=name,uuid,users,snappmap.snappthis_snapmap_uuid.*.*.*')
const groupsJSON = await groupsRes.json()

app.get('/', async function (req, res) {
  res.render('snappmaps.liquid', { groups: groupsJSON.data })
})



// app.get('/snappmaps/:uuid', async function (request, response) {

//   const snappmapResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snapmap?fields=*.*.*.*&filter[uuid][_eq]=' + request.params.uuid)
//   const snappmappJSON = await snappmapResponse.json()
//   const path = request.path


//   response.render('snappmap.liquid', { snappmap: snappmappJSON.data, groups: groupsJSON.data, path: path, currentPage: '', userId: userId })
// })









// const userId = '505c32d4-88fc-4102-8ef8-0847e9d9292b'

// // Snapps


// app.get('/snapps/:location', async function (request, response) {

//   const snappsResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*.*&filter[location][_eq]=' + request.params.location)
//   const snappsJSON = await snappsResponse.json()


//   response.render('snappmap.liquid', { snapps: snappsJSON.data, currentPage: 'snappmaps', path: request.path })
// })


// app.get('/snapps/snappmap/:uuid', async function (request, response) {

//   const snappResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*.*.*.*.*&filter[uuid][_eq]=' + request.params.uuid)
//   const snappJSON = await snappResponse.json()

//   response.render('snapp.liquid', { snapp: snappJSON.data[0], groups: groupsJSON.data, path: request.path, currentPage: '', userId: userId })
// })

// app.get('/snapps/location/:uuid', async function (request, response) {

//   const snappResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*.*.*.*.*&filter[uuid][_eq]=' + request.params.uuid)
//   const snappJSON = await snappResponse.json()

//   response.render('snapp.liquid', { snapp: snappJSON.data[0], groups: groupsJSON.data, path: request.path, currentPage: '', userId: userId })
// })


// app.get('/snapps/user/:uuid', async function (request, response) {

//   const snappResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*.*.*.*.*&filter[author][uuid][_eq]=' + request.params.uuid)
//   const snappJSON = await snappResponse.json()

//   response.render('snappmap.liquid', { snapps: snappJSON.data, path: request.path, currentPage: '', userId: userId })
// })





// // POST 

// app.post('/snappmaps/:uuid', upload.single('file'), async function (request, response) {

//   const snappmapid = request.params.uuid
//   const file = request.file

//   const formData = new FormData()
//   const blob = new Blob([file.buffer], { type: file.mimetype })
//   formData.append("file", blob, file.originalname)

//   const uploadResponse = await fetch('https://fdnd-agency.directus.app/files', {
//     method: "POST",
//     body: formData,
//   })

//   const uploadResponseData = await uploadResponse.json()
//   console.log(uploadResponse.status)
//   console.log(uploadResponseData)

//   if (uploadResponseData.data.id != null) {
//     let newSnap = {
//       location: 'Haarlem',
//       snapmap: snappmapid,
//       author: '505c32d4-88fc-4102-8ef8-0847e9d9292b',
//       picture: uploadResponseData.data.id,
//     }

//     const snapResponse = await fetch(`https://fdnd-agency.directus.app/items/snappthis_snap`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newSnap),
//     })


//     if (snapResponse.ok) {
//       response.redirect(303, `/snappmaps/${snappmapid}?status=succes`)
//     } else {
//       response.redirect(303, `/snappmaps/${snappmapid}?status=upload_failed`)
//     }

//   } else {
//     return response.redirect(303, `/snappmaps/${snappmapid}?status=upload_failed`)
//   }

// })


// app.post('/snapps/snappmap/:uuid', async function (request, response) {

//   const snappUuid = request.body.uuid

//   try {

//     const fetchResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_action', {
//       method: 'POST',
//       body: JSON.stringify({
//         action: request.body.action,
//         snap: snappUuid,
//         user: userId
//       }),
//       headers: {
//         'Content-Type': 'application/json;charset=UTF-8'
//       }
//     })

//     if (fetchResponse.ok) {
//       response.redirect(303, `/snapps/snappmap/${snappUuid}?status=like`)
//     } else {
//       response.redirect(303, `/snapps/snappmap/${snappUuid}?status=failed`)
//     }
//   } catch (error) {
//     console.error('Fetch error:', error);
//     response.redirect(303, `/snapps/snappmap/${snappUuid}?status=error`);
//   }
// })



app.use((req, res) => {
  res.status(404).render('404.liquid')
})


// app.post('/', async function (request, response) {
//   // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
//   // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
//   response.redirect(303, '/')
// })

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})