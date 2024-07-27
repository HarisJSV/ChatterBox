import React, {useCallback, useState} from 'react'
import {FileWithPath,useDropzone} from 'react-dropzone'
import { Button } from '../ui/button'
type FileUploaderProps={
  fieldChange:(FILES:File[])=>void;
  mediaUrl:string;
}
const FileUploader = ({fieldChange,mediaUrl}:FileUploaderProps) => {
  const [file,setFile]=useState<File[]>([])
  const [fileUrl,setFileUrl]=useState('')
  const onDrop = useCallback((acceptedFiles:FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldChange(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])
  const {getRootProps, getInputProps} = useDropzone({onDrop,
    accept:{
      'image/*':['.png','.jpg','.jpeg']
    }
  })

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 roundex-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer'/>
      {
        fileUrl? (
          <>
          <div className='flex flex-1 justify-center w-full p-5'>
            <img src={fileUrl} alt="" className='file_uploader-img'/>
          </div>
          <p className='file_uploader-label'>Drag photo to replace</p>
          </>
        ): (
          <div className='file_uploader-box'>
            <img src="" alt="" />
            <p className='text-light-4 small-regular mb-6'>PNG,JPEG,etc.</p>
          <Button className='shad-button_dark_4'>
            Browse from computer
          </Button>
          </div>
        )
      }
    </div>
  )
  return (
    <div>FileUploader</div>
  )
}

export default FileUploader