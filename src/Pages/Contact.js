function Contact() {
  return (
    <>
     <div className="hidden">
    {/* <div className="overflow-y-auto h-96 2xl:h-[35rem] w-full text-neutral-700"> */}
      <div className="md:flex justify-between gap-4">
        <div className="md:w-2/5 bg-red-500 p-4">
          <div className="bg-red-400 md:w-1/3 mx-4 mb-1 p-2">Contact Me</div>
          <div className="flex justify-between mx-4 my-1 2xl:my-7 p-2 bg-blue-50">
            <span className="w-1/2">First Name</span>
            <span className="w-1/2 text-center">[Jonathan]</span>
          </div>
          <div className="flex justify-between mx-4 my-1 2xl:my-7 p-2 bg-blue-100">
            <span className="w-1/2">Last Name</span>
            <span className="w-1/2 text-center">[Jonathan]</span>
          </div>
          <div className="flex justify-between mx-4 my-1 2xl:my-7 p-2 bg-blue-50">
            <span className="w-1/2">First Name</span>
            <span className="w-1/2 text-center">[Jonathan]</span>
          </div>
          <div className="flex justify-between mx-4 my-1 2xl:my-7 p-2 bg-blue-100">
            <span className="w-1/2">First Name</span>
            <span className="w-1/2 text-center">[Jonathan]</span>
          </div>
          <div className="flex justify-between mx-4 my-1 2xl:my-7 p-2 bg-blue-50">
            <span className="w-1/2">First Name</span>
            <span className="w-1/2 text-center">[Jonathan]</span>
          </div>
          <div className="flex justify-between mx-4 my-1 2xl:my-7 p-2 bg-blue-100">
            <span className="w-1/2">First Name</span>
            <span className="w-1/2 text-center">[Jonathan]</span>
          </div>
          <div className="flex justify-end">
            <button className="mx-4 p-2 bg-red-400">Submit</button>
          </div>
        </div>
        <div className="md:w-3/5 bg-red-500 p-4 md:flex gap-4">
          <div className="md:w-1/3">
            <div className="bg-red-400 mb-4 p-2">About</div>
            <div className="flex justify-center m-4">
              <div className="bg-red-400 w-24 h-24 2xl:w-60 2xl:h-60 rounded-full"></div>
            </div>
            <div className="flex justify-between my-1 2xl:my-4 p-2 bg-blue-50">
              <span className="w-1/2">First Name</span>
              <span className="w-1/2 text-center">[Jonathan]</span>
            </div>
            <div className="flex justify-between my-1 2xl:my-4 p-2 bg-blue-50">
              <span className="w-1/2">First Name</span>
              <span className="w-1/2 text-center">[Jonathan]</span>
            </div>
            <div className="flex justify-between my-1 2xl:my-4 p-2 bg-blue-50">
              <span className="w-1/2">First Name</span>
              <span className="w-1/2 text-center">[Jonathan]</span>
            </div>
            <div className="flex justify-between mt-1 p-2 bg-blue-50">
              <span className="w-1/2">First Name</span>
              <span className="w-1/2 text-center">[Jonathan]</span>
            </div>
          </div>
          <div className="bg-red-100 md:w-1/3 my-4 md:my-0">new</div>
          <div className="flex flex-col gap-4 md:w-1/3">
          <div className="bg-red-100 md:h-1/2">hi</div>
          <div className="bg-red-100 md:h-1/2">bye</div>
          </div>
        </div>
      </div>
      </div>
      <div className="md:flex flex-1 gap-4 items-center justify-center">
          <p className="text-center md:text-2xl">⚠️ Currently undergoing maintenance. Please check back soon!</p>
      </div>
    </>
  );
}

export default Contact;
