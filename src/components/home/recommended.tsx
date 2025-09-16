import { useScreenSize } from '../../hooks';

function Recommended() {
  const { isMobile } = useScreenSize();

  return (
    <div>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-6'>
        <h1
          className={` ${isMobile ? 'display-xs-extrabold' : 'display-md-extrabold'}`}
        >
          Recommended
        </h1>
        <div>
          <p
            className={`text-primary-100 ${isMobile ? 'text-md-extrabold' : 'text-lg-extrabold'}`}
          >
            See all
          </p>
        </div>
      </div>
    </div>
  );
}

export default Recommended;
