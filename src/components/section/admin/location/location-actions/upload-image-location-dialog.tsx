'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ImagePlus } from 'lucide-react'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useLocation } from '@/hooks/useLocation'
import Image from 'next/image'

interface UploadImageLocationDialogProps {
  isOpen: boolean
  onClose: () => void
  locationId: number // Sử dụng locationId để upload ảnh theo vị trí
}

export default function UploadImageLocationDialog({ isOpen, onClose, locationId }: UploadImageLocationDialogProps) {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>('')

  const { showNotification } = useToastifyNotification()
  const { postImageLocation, isLoading, getAllLocations } = useLocation() // Sử dụng store

  const formSchema = z.object({
    image: z.instanceof(File).refine((file) => file.size !== 0, 'Please upload an image')
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      image: new File([''], 'filename')
    }
  })

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader()
      try {
        reader.onload = () => setPreview(reader.result)
        reader.readAsDataURL(acceptedFiles[0])
        form.setValue('image', acceptedFiles[0])
        form.clearErrors('image')
      } catch (error) {
        setPreview(null)
        form.resetField('image')
      }
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 1000000,
    accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const error = await postImageLocation({ maViTri: locationId.toString() }, values.image)

    if (!error) {
      showNotification(`Cập nhật ảnh vị trí thành công!`, 'success')
      onClose()
      await getAllLocations()
    } else {
      showNotification(`Cập nhật ảnh vị trí thất bại: ${error.message}`, 'error')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='uppercase'>Cập Nhật Ảnh Vị Trí</DialogTitle>
          <DialogDescription>Thêm file ảnh vào phần dưới đây</DialogDescription>
        </DialogHeader>
        <div className='overflow-auto'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='image'
                render={() => (
                  <FormItem className='mx-auto md:w-1/2'>
                    <FormLabel className={`${fileRejections.length !== 0 && 'text-destructive'}`}>
                      <h2 className='text-xl font-semibold tracking-tight text-center'>
                        Tải lên ảnh của bạn
                        <span
                          className={
                            form.formState.errors.image || fileRejections.length !== 0
                              ? 'text-destructive'
                              : 'text-muted-foreground'
                          }
                        ></span>
                      </h2>
                    </FormLabel>
                    <FormControl>
                      <div
                        {...getRootProps()}
                        className='mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground'
                      >
                        {preview && (
                          <Image
                            src={preview as string}
                            alt='Uploaded image'
                            className='max-h-[400px] rounded-lg'
                            width={400}
                            height={400}
                          />
                        )}
                        <ImagePlus className={`size-40 ${preview ? 'hidden' : 'block'}`} />
                        <Input {...getInputProps()} type='file' />
                        {isDragActive ? <p>Thả ảnh vào đây!</p> : <p>Click vào đây hoặc kéo thả để tải ảnh lên</p>}
                      </div>
                    </FormControl>
                    <FormMessage>
                      {fileRejections.length !== 0 && <p>Hình ảnh phải nhỏ hơn 1MB và thuộc loại png, jpg hoặc jpeg</p>}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <div className='mt-5 space-x-2'>
                  <Button type='submit' variant={'success'} disabled={isLoading || form.formState.isSubmitting}>
                    {isLoading ? 'Tải lên...' : 'Hoàn Thành'}
                  </Button>
                  <Button variant={'error'} onClick={onClose}>
                    Hủy
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
