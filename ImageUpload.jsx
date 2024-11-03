import Resizer from "react-image-file-resizer";
import axios from "axios";
import {Avatar} from "antd";

const ImageUpload = ({ads, setAds}) => {

  const handleImageUpload = async (e) => {
        try {
            let files = e.target.files;
            files = [...files];
            if(files?.length){
                //console.log(files);
                setAds({...ads, uploading: true})
                files.map( file => {
                    new Promise(()=>{
                        Resizer.imageFileResizer(
                            file, 
                            1080,
                            720,
                            "JPEG",
                            100,
                            0,
                            async (uri) =>{
                                try {
                                    console.log("UPLOAD Image:", uri);
                                    const {data} = await axios.post("/upload-image",{
                                        image: uri,
                                    });
                                    setAds((prev)=> ({
                                        ...prev, 
                                        photos: [data, ...prev.photos],
                                        uploading: false
                                    }))
                                } catch (error) {
                                    console.log(error)
                                    setAds({...ads, uploading: false})
                                }
                            },
                            "base64"
                        );
                    });
                });
            }
        } catch (err){
            console.log(err);
            setAds({...ads, uploading: false})
        }
  }

  const deleteImageUpload = async (file) => {
    const ask = window.confirm("Delete Image?");
    if(!ask) return;
    setAds({...ads, uploading: true});
    try {
        const {data} = await axios.post("/delete-image", file);
        if(data?.ok){
            setAds((prev) => ({
                ...prev,
                photos: prev.photos.filter((p)=> p.Key !== file.Key),
                uploading: false,
            }));
        }        
    } catch (err){
        console.log(err)
        setAds({...ads, uploading: false})
    }
 }
  
  return (
    <>
        <label className="upload mb-3">
           {ads.uploading ? "Processing..." : "Upload Photos"}
           <input hidden type="file" accept="image/*" multiple  onChange={handleImageUpload} />        
        </label>
        <div className="mb-3">
            {ads.photos?.map((file, index) => (
                <Avatar 
                key={index}
                src={file?.Location} 
                shape="square"
                size="72"
                className="mx-1"
                onClick={()=> deleteImageUpload(file)}
                 />
            ))}
        </div>
    
    </>
  )
}

export default ImageUpload
