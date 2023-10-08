const EventCategory = () => {
  return (
    <>
      <section className="bg-white pt-32">
        <div className="container mx-auto px-5 text-center">
          <h4 className=" font-semibold text-xl text-primaryColor mb-4">
            Our Category
          </h4>
          <h2 className=" text-3xl font-bold text-black lg:text-5xl mb-6 lg:mb-10">
            Pelajari Skills Baru Sesuai Dengan Minatmu
          </h2>
          <p className="w-full lg:w-[60%] text-black mx-auto mb-6 lg:mb-10">
            Temukan event-event teknologi terbaru di kategori kami. Jelajahi
            beragam topik seperti pemrograman, kecerdasan buatan, dan sains
            data. Sambut inovasi bersama kami.
          </p>
          <div className="flex flex-wrap gap-10 justify-center">
            <div className="bg-[url('/src/assets/img/event-18.jpg')] bg-no-repeat bg-cover bg-center rounded-xl w-[300px] h-[350px] shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
              <h2 className="font-semibold text-2xl text-white relative top-[80%] line-clamp-6 px-3">
                Web Development
              </h2>
            </div>
            <div className="bg-[url('/src/assets/img/event-7.jpg')] bg-no-repeat bg-cover bg-center rounded-xl w-[300px] h-[350px] shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
              <h2 className="font-semibold text-2xl text-white relative top-[80%] line-clamp-6 px-3">
                UIUX Design
              </h2>
            </div>
            <div className="bg-[url('/src/assets/img/event-11.jpg')] bg-no-repeat bg-cover bg-center rounded-xl w-[300px] h-[350px] shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
              <h2 className="font-semibold text-2xl text-white relative top-[80%] line-clamp-6 px-3">
                Graphic Design
              </h2>
            </div>
            <div className="bg-[url('/src/assets/img/event-12.jpg')] bg-no-repeat bg-cover bg-center rounded-xl w-[300px] h-[350px] shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
              <h2 className="font-semibold text-2xl text-white relative top-[80%] line-clamp-6 px-3">
                Product Management
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventCategory;
