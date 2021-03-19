import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'
import FourthSection from './FourthSection'

const Home = () => {
  return (
    <>
      <div className="backgroundZindex"></div>
      <div className="sectionBox ">
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
      </div>
    </>
  )
}

export default Home;