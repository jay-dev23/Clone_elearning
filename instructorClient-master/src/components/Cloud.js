// import React, { useState } from 'react';
// import axios from 'axios';

// export function UploadImageComponent() {
//   const [image, setimage] = useState('');
//   const [loading, setloading] = useState(false);

//   // const uploadimage = (e) => {
//   //   const files = e.target.files[0];
//   //   const data = new FormData();
//   //   data.append('upload_preset', 'AIOCuniversity');
//   //   data.append('file', files);
//   //   setloading(true);
//   //   axios
//   //     .post(
//   //       'https://api.cloudinary.com/v1_1/aiocuniversity-com/image/upload',
//   //       data
//   //     )
//   //     .then((res) => setimage(console.log(res.data.secure_url)))
//   //     .then(setloading(false))
//   //     .catch((err) => console.log(err));
//   // };

//   const uploadimage = () => {
//     window.cloudinary.openUploadWidget(
//       {
//         cloud_name: 'aiocuniversity-com',
//         upload_preset: 'AIOCuniversity',
//         tags: ['AIOC'],
//         sources: ['local', 'url', 'image_search'],
//         searchBySites: ['all', 'cloudinary.com'],
//       },
//       function (error, result) {
//         if (result && result.event === 'success') {
//           console.log(result.info.url);
//           console.log(result.info.public_id);
//           // props.setVideoPublicId(result.info.public_id);
//           setimage(result.info.url);
//         }
//       }
//     );
//   };
//   return (
//     <div>
//       {/* <input
//         type="file"
//         name="file"
//         placeholder="upload image"
//         onChange={uploadimage}
//       /> */}
//       <button onClick={uploadimage}>Upload image</button>
//       {loading ? (
//         <h3>loading...</h3>
//       ) : (
//         <img src={image} width="100" height="100" />
//       )}
//       {image}
//     </div>
//   );
// }

// export function UploadVideocomponent(props) {
//   const [ifSuccess, setIsSuccess] = useState(false);

//   const uploadWidget = () => {
//     window.cloudinary.openUploadWidget(
//       {
//         cloud_name: 'aiocuniversity-com',
//         upload_preset: 'AIOCuniversity',
//         tags: ['AIOC'],
//         sources: ['local', 'image_search'],
//       },
//       function (error, result) {
//         if (result && result.event === 'success') {
//           console.log(result.info.url);
//           console.log(result.info.public_id);
//           // props.setVideoPublicId(result.info.public_id);
//           setIsSuccess(true);
//         }
//       }
//     );
//   };
//   return (
//     <>
//       <button onClick={uploadWidget}>Upload Video</button>
//       <span>{ifSuccess ? 'Uploaded video' : null}</span>
//     </>
//   );
// }
