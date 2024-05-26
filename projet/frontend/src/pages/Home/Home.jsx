import React from "react";
import { Link } from "react-router-dom";
import useTimer from "./timer";
import { useEffect, useRef } from 'react';


const Home = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const containerWidth = window.innerWidth;
    let currentPosition = containerWidth;

    const animate = () => {
      if (currentPosition <= -marquee.scrollWidth) {
        currentPosition = containerWidth;
      } else {
        currentPosition -= 3; 
      }
      marquee.style.transform = `translateX(${currentPosition}px)`;
      requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animate);
  }, []);






  const { days, hours, minutes, seconds } = useTimer("2024-07-04T23:59:59");
  return (
    <div className="pt-32">
         <div class="md:max-h-screen mx-auto lg:h-[800px]">
        
        <video
            class="object-cover h-[400px] md:h-full w-screen lg:h-screen absolute -z-1 top-0 "
            src="https://www.festivaldulivredeparis.fr/uploads/bilan-format-16x9-vf-664494452553b.mp4"
            autoplay
            loop
            muted
        ></video>
  
    </div>
    <br /><br /> <br />
      <div className="font-sans text-[#333] max-w-6xl max-md:max-w-md mx-auto my-5 px-8">
        <div className="grid md:grid-cols-2 items-center md:gap-8 gap-6">
          <div className="max-md:order-1 max-md:text-center relative">
            <h2 className="lg:text-6xl md:text-5xl text-3xl font-extrabold mb-4 md:!leading-[56px]">
              <span className="text-blue-600">2024 Paris Book</span>  Festival{" "}
              <span className="text-blue-600">Call for</span> Entries
            </h2>
            <div>
      
      
    </div>



            <p className="mt-6 text-base leading-relaxed">
              Paris _ The 2024 Paris Book Festival has issued a call for entries to its annual competition honoring the best of international publishing.
              The 2024 Paris Book Festival will consider major publisher, independent publisher and self-published works in the following categories: non-fiction,
               fiction, biography/autobiography, children's books, cookbooks, compilations/anthologies; young adult, how-to, photography/art, unpublished stories,
                business, poetry, memoir, spiritual/religious, travel and the wild card (anything goes!).
            </p>
            <Link
              to="/books"
              className="block w-fit bg-blue-600 hover:bg-transparent hover:text-blue-600 border-2 border-blue-600 mt-10 transition-all text-white font-bold text-sm rounded-md px-6 py-2.5"
            >
              Get Started
            </Link>
            <div className="mt-10">
              <div className="grid sm:grid-cols-3 gap-4 items-center">
                <div className="flex flex-col items-center text-center">
                  <h5 className="font-bold text-xl mb-1">10+</h5>
                  <p>Years Experience</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <h5 className="font-bold text-xl mb-1">890</h5>
                  <p>Books</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <h5 className="font-bold text-xl mb-1">250</h5>
                  <p>Business Partners</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:h-[550px] md:h-[550px] flex items-center relative -top-7 max-md:before:hidden before:absolute before:h-[120%] before:w-[120%] before:right-0 before:z-0">
            <img
              src="./images/hero.jpg"
              className="rounded-md w-full z-40 relative"
              alt="Dining Experience"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 z-50 md:px-4 max-md:mt-10">
          <div className="bg-white p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 mb-4 inline-block bg-blue-100 p-3 rounded-md"
              viewBox="0 0 32 32"
            >
              <path
                d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z"
                data-original="#000000"
              />
              <path
                d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z"
                data-original="#000000"
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">Customization</h3>
            <p className="text-sm">Tailor our product to suit your needs.</p>

          </div>
          <div className="bg-white p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 mb-4 inline-block bg-blue-100 p-3 rounded-md"
              viewBox="0 0 512.001 512.001"
            >
              <path
                d="M271.029 0c-33.091 0-61 27.909-61 61s27.909 61 61 61 60-27.909 60-61-26.909-61-60-61zm66.592 122c-16.485 18.279-40.096 30-66.592 30-26.496 0-51.107-11.721-67.592-30-14.392 15.959-23.408 36.866-23.408 60v15c0 8.291 6.709 15 15 15h151c8.291 0 15-6.709 15-15v-15c0-23.134-9.016-44.041-23.408-60zM144.946 460.404 68.505 307.149c-7.381-14.799-25.345-20.834-40.162-13.493l-19.979 9.897c-7.439 3.689-10.466 12.73-6.753 20.156l90 180c3.701 7.423 12.704 10.377 20.083 6.738l19.722-9.771c14.875-7.368 20.938-25.417 13.53-40.272zM499.73 247.7c-12.301-9-29.401-7.2-39.6 3.9l-82 100.8c-5.7 6-16.5 9.6-22.2 9.6h-69.901c-8.401 0-15-6.599-15-15s6.599-15 15-15h60c16.5 0 30-13.5 30-30s-13.5-30-30-30h-78.6c-7.476 0-11.204-4.741-17.1-9.901-23.209-20.885-57.949-30.947-93.119-22.795-19.528 4.526-32.697 12.415-46.053 22.993l-.445-.361-21.696 19.094L174.28 452h171.749c28.2 0 55.201-13.5 72.001-36l87.999-126c9.9-13.201 7.2-32.399-6.299-42.3z"
                data-original="#000000"
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">Support</h3>
            <p className="text-sm">
              24/7 customer support for all your inquiries.
            </p>

          </div>
          <div className="bg-white p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-12 mb-4 inline-block bg-blue-100 p-3 rounded-md"
              viewBox="0 0 24 24"
            >
              <g fillRule="evenodd" clipRule="evenodd">
                <path
                  d="M17.03 8.97a.75.75 0 0 1 0 1.06l-4.2 4.2a.75.75 0 0 1-1.154-.114l-1.093-1.639L8.03 15.03a.75.75 0 0 1-1.06-1.06l3.2-3.2a.75.75 0 0 1 1.154.114l1.093 1.639L15.97 8.97a.75.75 0 0 1 1.06 0z"
                  data-original="#000000"
                />
                <path
                  d="M13.75 9.5a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-1.25H14.5a.75.75 0 0 1-.75-.75z"
                  data-original="#000000"
                />
                <path
                  d="M3.095 3.095C4.429 1.76 6.426 1.25 9 1.25h6c2.574 0 4.57.51 5.905 1.845C22.24 4.429 22.75 6.426 22.75 9v6c0 2.574-.51 4.57-1.845 5.905C19.571 22.24 17.574 22.75 15 22.75H9c-2.574 0-4.57-.51-5.905-1.845C1.76 19.571 1.25 17.574 1.25 15V9c0-2.574.51-4.57 1.845-5.905zm1.06 1.06C3.24 5.071 2.75 6.574 2.75 9v6c0 2.426.49 3.93 1.405 4.845.916.915 2.419 1.405 4.845 1.405h6c2.426 0 3.93-.49 4.845-1.405.915-.916 1.405-2.419 1.405-4.845V9c0-2.426-.49-3.93-1.405-4.845C18.929 3.24 17.426 2.75 15 2.75H9c-2.426 0-3.93.49-4.845 1.405z"
                  data-original="#000000"
                />
              </g>
            </svg>
            <h3 className="text-xl font-bold mb-2">Performance</h3>
            <p className="text-sm">
              Experience blazing-fast performance with our product.
            </p>

          </div>
        </div>
      </div>
      <hr />
      <div style={{backgroundColor:"#F9FAFB"}}>
      <h2 style={{ fontSize: '4rem', color: '#3b82f6', fontWeight: 'bold' ,textAlign:"center"}}>SAVE THE DATE !</h2>
      </div>
      <hr />
      

    
      <div className="w-full flex justify-center items-center my-10 ">
          <h1 className="text-6xl md:text-9xl  text-blue-600 font-bold text-center ">
            {days}:{hours}:{minutes}:{seconds}
          </h1>
        </div>
        
      <div className="font-[sans-serif] text-[#333] bg-gray-50 my-10">
        <div className="lg:max-w-7xl max-w-2xl mx-auto p-4">
        
          <h2 className="text-6xl md:text-6xl  text-blue-900 font-bold text-center ">6 Days of creativity are coming </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 max-md:justify-center mt-12">
            <div className="flex items-center max-sm:flex-col">
              <img
              style={{width:'350px', height:'250px'}}
                src="https://media.letelegramme.fr/api/v1/images/view/6617e540f648b41c3306828f/web_golden_xl/6617e540f648b41c3306828f.1"
                className=""
              />
              <div className="p-4 sm:ml-4">
                <h4 className="text-base font-extrabold">
                  Day 1
                </h4>
                <p className="text-xs mt-1"> Festival Arrival</p>
                <div className="mt-4">
                  <p className="text-sm leading-relaxed">
                  Arrival and orientation, preparing for the festival.
                  </p>
                </div>
                <div className="space-x-4 mt-4">
                 
                  
        
                </div>
              </div>
            </div>
            {/* ///////////////////////////2/////////////////////// */}
            <div className="flex items-center max-sm:flex-col">
              <img
              style={{width:'350px', height:'250px'}}
                src="https://www.festivaldulivredeparis.fr/uploads/dsc-8693-66014cc6802f7.jpg"
                className=""
              />
              <div className="p-4 sm:ml-4">
                <h4 className="text-base font-extrabold">Day 2</h4>
                <p className="text-xs mt-1">Festival Kickoff</p>
                <div className="mt-4">
                  <p className="text-sm leading-relaxed">
                  Opening ceremonies, author talks, and festival exploration
                  </p>
                </div>
                <div className="space-x-4 mt-4">
                  
                    
                  
                </div>
                
              </div>

            </div>
            {/* ////////////////////3////////////////////////////////// */}
            <div className="flex items-center max-sm:flex-col">
              <img
              style={{width:'350px', height:'250px'}}
                src="https://www.festivaldulivredeparis.fr/uploads/_14-04-format-16x9-661d3c0b3da94.jpg"
                className=""
              />
              <div className="p-4 sm:ml-4">
                <h4 className="text-base font-extrabold">Day 3</h4>
                <p className="text-xs mt-1">Literary Exploration</p>
                <div className="mt-4">
                  <p className="text-sm leading-relaxed">
                  Visiting landmarks, attending talks, and indulging in French cuisine.
                  </p>
                </div>
                <div className="space-x-4 mt-4">
                  
                    
                  
                </div>
                
              </div>

            </div>
            {/* ///////////////////////////4//////////////////////////////// */}
            <div className="flex items-center max-sm:flex-col">
              <img
              style={{width:'350px', height:'250px'}}
                src="https://www.francetvinfo.fr/pictures/t3rDDYS6Rs70zLAi_zyjQZod91M/1500x843/2024/04/15/080-hl-rmilani-2352259-661cdff82b56c048398599.jpg"
                className=""
              />
              <div className="p-4 sm:ml-4">
                <h4 className="text-base font-extrabold">Day 4</h4>
                <p className="text-xs mt-1">Cultural Immersion</p>
                <div className="mt-4">
                  <p className="text-sm leading-relaxed">
                  Exploring museums, cafes, and attending a cultural performance
                  </p>
                </div>
                <div className="space-x-4 mt-4">
                  
                    
                  
                </div>
                
              </div>

            </div>
            {/* /////////////////////5/////////////////////// */}
            <div className="flex items-center max-sm:flex-col">
              <img
              style={{width:'350px', height:'250px'}}
                src="https://www.festivaldulivredeparis.fr/uploads/_recap-final-v4-format-16x9-6627726c841fa.jpg"
                className=""
              />
              <div className="p-4 sm:ml-4">
                <h4 className="text-base font-extrabold">Day 5</h4>
                <p className="text-xs mt-1">Festival Deep Dive</p>
                <div className="mt-4">
                  <p className="text-sm leading-relaxed">
                  Engaging in author signings, workshops, and genre-specific sessions.
                  </p>
                </div>
                <div className="space-x-4 mt-4">
                  
                    
                  
                </div>
                
              </div>

            </div>
            {/* /////////////////6////////////////// */}
            <div className="flex items-center max-sm:flex-col">
              <img
              style={{width:'350px', height:'250px'}}
                src="https://longislandbusiness.com/wp-content/uploads/2023/08/Diner-en-Blanc-2018-Mexico-City-photo-a-029.jpg"
                className=""
              />
              <div className="p-4 sm:ml-4">
                <h4 className="text-base font-extrabold">Day 6</h4>
                <p className="text-xs mt-1">Farewell</p>
                <div className="mt-4">
                  <p className="text-sm leading-relaxed">
                  Final festival visits, Parisian exploration, and a farewell dinner.
                  </p>
                </div>
                <div className="space-x-4 mt-4">
                  
                    
                  
                </div>
                
              </div>

            </div>
            
          </div>
        </div>
        
      </div>
      <h2 style={{ fontSize: '3rem', color: '#3b82f6', textAlign:"center",fontFamily:"cursive"}}>Famous authors who will attend the event :</h2>
      <div style={{ display: 'flex',flexWrap:'wrap', alignItems: 'center', padding: '50px', marginLeft: '30px' }}>
  <div style={{ flex: 1, margin: 20, textAlign: 'center' }}>
    <img src="https://media.hachette.fr/fit-in/360x360/imgAuteur/004/000000021062_L_mussso-guillaume.jpg?source=web" style={{ width: '500px', height: '400px' }} alt="Guillaume Musso" />
    <h1 style={{ fontWeight: 'bold', marginTop: '10px',maxWidth:'500px' }}>Guillaume Musso</h1>
    <ul>
    <span style={{ color: 'blue' , fontWeight:"bold" }}>most well-known books</span>
    <li>"Et Après..." (English: "Afterwards...")</li>
    <li>"Sauve-Moi" (English: "Save Me")</li>
    <li>"La Fille de Papier" (English: "Girl on Paper")</li>
    </ul>
    
  </div>
  <div style={{ flex: 1, margin: 20, textAlign: 'center' }}>
    <img src="https://www.babelio.com/users/AVT_Melissa-Da-Costa_281.jpg" style={{ width: '520px', height: '400px',maxWidth:'520px' }} alt="Mélissa Da Costa" />
    <h1 style={{ fontWeight: 'bold', marginTop: '10px' }}>Mélissa Da Costa</h1>
    <ul><span style={{ color: 'blue' , fontWeight:"bold" }}>most well-known books</span>

    <li>"Toutes ces vies qu'on abandonne"</li>
    <li>"Même les méchants rêvent d'amour"</li>
    <li>"Les Retrouvailles"</li>
    </ul>
  </div>
  <div style={{ flex: 1, margin: 20, textAlign: 'center' }}>
    <img src="https://media.npr.org/assets/img/2022/10/24/colleen-hoover_custom-c2b1f424ca02d5257a3b6419f0819ebfa39d9fd6-s1600-c85.webp" style={{ width: '500px', height: '400px' }} alt="Colleen Hoover" />
    <h1 style={{ fontWeight: 'bold', marginTop: '10px' ,maxWidth:'500px'}}>Colleen Hoover</h1>
    <ul><span style={{ color: 'blue' , fontWeight:"bold" }}>most well-known books</span>
    <li>"Slammed"</li>
    <li>"Hopeless"
</li>
    <li>"It Ends with Us"</li>
    </ul>
  </div>
</div>

     <div className="max-w-screen-xl mx-auto">
      
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', color: '#3b82f6' }}>Our Sponsors</h2>
      </div>
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', backgroundColor: '#fff', padding: '10px 0' }}>
        <div ref={marqueeRef} style={{ display: 'inline-flex' }}>
          <img
            style={{ margin: '0 50px', height: '100px' }}
            src="https://w1.pngwing.com/pngs/706/638/png-transparent-pepsico-logo-rock-on-tv-television-sponsor-microsoft-azure-exhibition-pepsi-bottling-group-text-thumbnail.png"
            alt="Pepsi"
          />
          <img
            style={{ margin: '0 50px', height: '100px' }}
            src="https://cdn.worldvectorlogo.com/logos/sponsor-magazine.svg"
            alt="Sponsor Magazine"
          />
          <img
            style={{ margin: '0 50px', height: '100px' }}
            src="https://lh3.googleusercontent.com/proxy/pQ4T3_D5boL5SICny-b4WeJVI8OF9kJC0FEclPpP0Wd0GnKXZP7JbgrYw_IiQdwjf4ygWP5xL4CzFj3T"
            alt="Sponsor 3"
          />
          <img
            style={{ margin: '0 50px', height: '100px' }}
            src="https://logowik.com/content/uploads/images/125_redbull.jpg"
            alt="Red Bull"
          />
          <img
            style={{ margin: '0 50px', height: '100px' }}
            src="https://media1.giphy.com/media/DWUEBCadFCSc0/giphy.gif"
            alt="Sponsor 4"
          />
          <img
            style={{ margin: '0 50px', height: '100px' }}
            src="https://e7.pngegg.com/pngimages/913/289/png-clipart-logo-brand-sponsor-video-game-trademark-twitch-donate-blue-game.png"
            alt="Sponsor 5"
          />
        </div>
      </div>
    </div>
    </div>

   

    </div>

  );
};

export default Home;
