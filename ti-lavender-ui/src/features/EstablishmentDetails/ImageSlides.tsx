import { SwiperSlide } from 'swiper/react'
import GetImage from '../../assets/GetImage'

function ImageSlides() {
  return (
    <div className='flex items-center justify-center mx-16'>
      {/* {
        SampleData[0].image.map((image)=> (
          <img src={image} className='w-full md:w-1/3 h-44 mb-4 md:mb-0 rounded-2xl'/>
        ))
      } */}
      <SwiperSlide>

        <GetImage imageName='SaloonImage' className='w-full rounded-lg px-2' />
      </SwiperSlide>
      <SwiperSlide>

        <GetImage imageName='SaloonImage' className='w-full rounded-lg px-2' />
      </SwiperSlide><SwiperSlide>

        <GetImage imageName='SaloonImage' className='w-full rounded-lg px-2' />
      </SwiperSlide><SwiperSlide>

        <GetImage imageName='SaloonImage' className='w-full rounded-lg px-2' />
      </SwiperSlide><SwiperSlide>

        <GetImage imageName='SaloonImage' className='w-full rounded-lg px-2' />
      </SwiperSlide><SwiperSlide>

        <GetImage imageName='SaloonImage' className='w-full rounded-lg px-2' />
      </SwiperSlide>

    </div>
  )
}

export default ImageSlides 