import tiko from '../public/tiko-face.png';
import Image from 'next/image';

export default function Header() {
    return (
      <header className="flex w-full border-b border-purple-300 shadow-xl drop-shadow-purple-200 lg:h-20">
            <div className='flex w-full h-35 md:h-30 lg:h-20 '>
                <div className='w-full flex pl-8 pr-8 lg:pr-20 lg:pl-20'>
                    <div className='w-full flex flex-col items-center pt-3 gap-6 md:gap-2 lg:flex-row lg:justify-between lg:pt-0'>
                        <div className='lg:flex flex-row gap-3'>
                        <Image
                            src={tiko}
                            alt='tiko'
                            className='h-14 w-14 md:h-12.5 md:w-12.5'
                        />
                        <h1 className='hidden items-center font-medium text-blue-500 text-base lg:flex lg:text-lg lg:pt-1 fade-title'>Tiko, your cute time helper.</h1>
                        </div>
                    
                        <div className='flex w-full justify-center gap-8 lg:w-auto'>
                            <h1 className='fade-title font-normal text-blue-500 text-lg disabled'>Home</h1>
                            <h1 className='fade-title font-normal text-blue-500 text-lg cursor-pointer'>Timeline</h1>
                            <h1 className='fade-title font-normal text-blue-500 text-lg cursor-pointer'>Footer</h1>
                        </div>
                    </div>
                </div>
            </div>
      </header>
    );
  }
  