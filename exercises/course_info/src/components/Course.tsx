import ICourse from "../models/ICourse";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({course}: {course: ICourse}) => {
    return (
        <div className="course">
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;