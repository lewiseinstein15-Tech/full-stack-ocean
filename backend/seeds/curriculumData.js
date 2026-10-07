const Curriculum = require('../models/Curriculum');
const Course = require('../models/Curriculum').Course;

// Sample MIT OCW links for Week 1
const MIT_60001_LECTURES = {
  l1: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-1/',
  l2: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-2/',
  l3: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-3/',
  l4: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-4/',
  l5: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-5/',
  l6: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-6/',
  l7: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-7/',
  l8: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-8/',
  l9: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-9/',
  l10: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-10/',
  l11: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-11/',
  l12: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/resources/lecture-12/',
};

const MIT_1801SC_LECTURES = {
  l1: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-1/',
  l2: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-2/',
  l3: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-3/',
  l4: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-4/',
  l5: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-5/',
  l6: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-6/',
  l7: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-7/',
  l8: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-8/',
  l9: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-9/',
  l10: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-10/',
  l11: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-11/',
  l12: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/resources/lecture-12/',
};

const MIT_6042J_LECTURES = {
  l1: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-1/',
  l2: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-2/',
  l3: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-3/',
  l4: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-4/',
  l5: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-5/',
  l6: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-6/',
  l7: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-7/',
  l8: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-8/',
  l9: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-9/',
  l10: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-10/',
  l11: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-11/',
  l12: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/resources/lecture-12/',
};

const PRACTICE_LINKS = {
  pset0: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
  pset1: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
  calcPset1: 'https://ocw.mit.edu/courses/18-01sc-calculus-fall-2021/assignments/',
  proofSet1: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/assignments/',
  inductionProblems: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/assignments/',
  gcdProblems: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/assignments/',
  rsaProblems: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/exams/',
};

/**
 * Seed the curriculum database with the Full Stack Ocean schedule
 * Based on the PDF: Full_Stack_Ocean_ULTIMATE_Daily.pdf
 */
const seedCurriculum = async () => {
  try {
    // Check if curriculum already exists
    const existing = await Curriculum.findOne({ 
      title: 'Full Stack Ocean - Ultimate Daily Timetable' 
    });
    
    if (existing) {
      console.log('Curriculum already seeded, skipping...');
      return;
    }

    // Create courses
    const pythonCourse = await Course.create({
      courseCode: '6.0001',
      title: 'Introduction to Computer Science and Programming in Python',
      description: 'Introduction to programming, algorithmic thinking, and computational problem-solving',
      term: 'TERM1',
      weeklyHours: 12,
      resources: {
        lectures: [],
        assignments: [],
        exams: []
      }
    });

    const calcCourse = await Course.create({
      courseCode: '18.01SC',
      title: 'Single Variable Calculus',
      description: 'Calculus of single variable, covering limits, derivatives, integration, and series',
      term: 'TERM1',
      weeklyHours: 18,
      resources: {
        lectures: [],
        assignments: [],
        exams: []
      }
    });

    const mathCsCourse = await Course.create({
      courseCode: '6.042J',
      title: 'Mathematics for Computer Science',
      description: 'Introduction to mathematical reasoning, discrete structures, and probability',
      term: 'TERM1',
      weeklyHours: 15,
      resources: {
        lectures: [],
        assignments: [],
        exams: []
      }
    });

    // Week 1: 07-13 Oct 2026
    const week1 = {
      weekNumber: 1,
      startDate: new Date('2026-10-07'),
      endDate: new Date('2026-10-13'),
      title: 'Week 1 - Foundations',
      description: 'Introduction to Python, Calculus basics, and Proofs',
      totalHours: 12,
      courses: [pythonCourse._id, calcCourse._id, mathCsCourse._id],
      days: [
        {
          date: new Date('2026-10-07'),
          dayOfWeek: 'Wednesday',
          lessons: [
            {
              order: 1,
              title: 'What is Computation?',
              description: 'Introduction to computational thinking and Python setup',
              lectureLink: {
                url: MIT_60001_LECTURES.l1,
                title: 'Lecture 1',
                description: 'What is Computation?'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset0,
                title: 'Install Python + do Pset 0 (setup)',
                description: 'Setup and Problem Set 0'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 1 }
            },
            {
              order: 2,
              title: 'Rate of Change',
              description: 'Introduction to limits and derivatives',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l1,
                title: 'Lecture 1',
                description: 'Rate of Change'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Start Problem Set 1 (Differentiation)',
                description: 'Calculus Problem Set 1'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 1 }
            }
          ]
        },
        {
          date: new Date('2026-10-08'),
          dayOfWeek: 'Thursday',
          lessons: [
            {
              order: 1,
              title: 'Proofs & Axioms',
              description: 'Introduction to mathematical proofs and axiomatic reasoning',
              lectureLink: {
                url: MIT_6042J_LECTURES.l1,
                title: 'Lecture 1',
                description: 'Proofs & Axioms'
              },
              practiceLink: {
                url: PRACTICE_LINKS.proofSet1,
                title: 'Download & skim problem sets',
                description: 'Problem Sets - skim'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 1 }
            }
          ]
        },
        {
          date: new Date('2026-10-09'),
          dayOfWeek: 'Friday',
          lessons: [
            {
              order: 1,
              title: 'Branching and Iteration',
              description: 'Control flow: conditionals and loops in Python',
              lectureLink: {
                url: MIT_60001_LECTURES.l2,
                title: 'Lecture 2',
                description: 'Branching and Iteration'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset0,
                title: 'Continue Pset 0 + early exercises',
                description: 'Problem Set 0 continued'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 2 }
            }
          ]
        },
        {
          date: new Date('2026-10-10'),
          dayOfWeek: 'Saturday',
          lessons: [
            {
              order: 1,
              title: 'Limits',
              description: 'Understanding limits as foundation of calculus',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l2,
                title: 'Lecture 2',
                description: 'Limits (playlist #2)'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Continue Differentiation Pset',
                description: 'Calculus Pset 1 continued'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 2 }
            }
          ]
        },
        {
          date: new Date('2026-10-11'),
          dayOfWeek: 'Sunday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'Redraw concepts from Days 1-3: What is Computation, Rate of Change, Proofs & Axioms, Branching and Iteration, Limits'
        },
        {
          date: new Date('2026-10-12'),
          dayOfWeek: 'Monday',
          lessons: [
            {
              order: 1,
              title: 'Connectives',
              description: 'Logical connectives and truth tables',
              lectureLink: {
                url: MIT_6042J_LECTURES.l2,
                title: 'Lecture 2',
                description: 'Connectives (playlist #2)'
              },
              practiceLink: {
                url: PRACTICE_LINKS.proofSet1,
                title: 'Start first proof exercises',
                description: 'Proof exercises'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 2 }
            }
          ]
        },
        {
          date: new Date('2026-10-13'),
          dayOfWeek: 'Tuesday',
          lessons: [
            {
              order: 1,
              title: 'Practice Day - Finish Pset 0',
              description: 'Complete all of Problem Set 0',
              lectureLink: {
                url: MIT_60001_LECTURES.l1,
                title: 'Review Lecture 1',
                description: 'What is Computation (review)'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset0,
                title: 'Finish Pset 0 completely',
                description: 'Problem Set 0 complete'
              },
              duration: 120,
              metadata: { course: '6.0001', practiceDay: true }
            }
          ]
        }
      ]
    };

    // Week 2: 14-20 Oct 2026
    const week2 = {
      weekNumber: 2,
      startDate: new Date('2026-10-14'),
      endDate: new Date('2026-10-20'),
      title: 'Week 2 - Building Foundations',
      description: 'Strings, derivatives, induction, and functions',
      totalHours: 12,
      courses: [pythonCourse._id, calcCourse._id, mathCsCourse._id],
      days: [
        {
          date: new Date('2026-10-14'),
          dayOfWeek: 'Wednesday',
          lessons: [
            {
              order: 1,
              title: 'String Manipulation / Guess & Check',
              description: 'Working with strings, brute force algorithms',
              lectureLink: {
                url: MIT_60001_LECTURES.l3,
                title: 'Lecture 3',
                description: 'String Manipulation / Guess & Check'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset1,
                title: 'Start Problem Set 1',
                description: 'Problem Set 1'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 3 }
            }
          ]
        },
        {
          date: new Date('2026-10-15'),
          dayOfWeek: 'Thursday',
          lessons: [
            {
              order: 1,
              title: 'Derivatives',
              description: 'Derivative rules and applications',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l3,
                title: 'Lecture 3',
                description: 'Derivatives (playlist #3)'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Continue Calc Pset 1',
                description: 'Calculus Pset 1 continued'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 3 }
            }
          ]
        },
        {
          date: new Date('2026-10-16'),
          dayOfWeek: 'Friday',
          lessons: [
            {
              order: 1,
              title: 'Induction I',
              description: 'Principle of mathematical induction',
              lectureLink: {
                url: MIT_6042J_LECTURES.l3,
                title: 'Lecture 3',
                description: 'Induction I (playlist #3)'
              },
              practiceLink: {
                url: PRACTICE_LINKS.inductionProblems,
                title: 'Induction practice problems',
                description: 'Induction problems'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 3 }
            }
          ]
        },
        {
          date: new Date('2026-10-17'),
          dayOfWeek: 'Saturday',
          lessons: [
            {
              order: 1,
              title: 'Decomposition, Abstraction, Functions',
              description: 'Breaking down problems, abstraction, and function design',
              lectureLink: {
                url: MIT_60001_LECTURES.l4,
                title: 'Lecture 4',
                description: 'Decomposition, Abstraction, Functions'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset1,
                title: 'Continue Pset 1 (functions)',
                description: 'Problem Set 1 continued'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 4 }
            }
          ]
        },
        {
          date: new Date('2026-10-18'),
          dayOfWeek: 'Sunday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: '3-box diagrams + induction: Redraw diagrams and redo proofs from Week 2'
        },
        {
          date: new Date('2026-10-19'),
          dayOfWeek: 'Monday',
          lessons: [
            {
              order: 1,
              title: 'Chain Rule / Slopes',
              description: 'Chain rule and its applications to slopes',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l4,
                title: 'Lecture 4',
                description: 'Chain Rule / slopes'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Calc exercises on chain rule',
                description: 'Chain rule exercises'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 4 }
            }
          ]
        },
        {
          date: new Date('2026-10-20'),
          dayOfWeek: 'Tuesday',
          lessons: [
            {
              order: 1,
              title: 'Induction II',
              description: 'Advanced mathematical induction techniques',
              lectureLink: {
                url: MIT_6042J_LECTURES.l4,
                title: 'Lecture 4',
                description: 'Induction II'
              },
              practiceLink: {
                url: PRACTICE_LINKS.inductionProblems,
                title: 'More induction exercises',
                description: 'Additional induction problems'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 4 }
            }
          ]
        }
      ]
    };

    // Week 3: 21-27 Oct 2026
    const week3 = {
      weekNumber: 3,
      startDate: new Date('2026-10-21'),
      endDate: new Date('2026-10-27'),
      title: 'Week 3 - Data Structures & Advanced Calculus',
      description: 'Lists, recursion, product rule, strong induction',
      totalHours: 12,
      courses: [pythonCourse._id, calcCourse._id, mathCsCourse._id],
      days: [
        {
          date: new Date('2026-10-21'),
          dayOfWeek: 'Wednesday',
          lessons: [
            {
              order: 1,
              title: 'Tuples, Lists, Aliasing, Mutability',
              description: 'Data structures: tuples, lists, and memory management',
              lectureLink: {
                url: MIT_60001_LECTURES.l5,
                title: 'Lecture 5',
                description: 'Tuples, Lists, Aliasing, Mutability'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset1,
                title: 'Finish Pset 1 + start Pset 2',
                description: 'Problem Set 1 complete, Problem Set 2 start'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 5 }
            }
          ]
        },
        {
          date: new Date('2026-10-22'),
          dayOfWeek: 'Thursday',
          lessons: [
            {
              order: 1,
              title: 'Product Rule',
              description: 'Differentiating products and quotients',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l5,
                title: 'Lecture 5',
                description: 'Product Rule'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Calc product/quotient exercises',
                description: 'Product/quotient rule exercises'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 5 }
            }
          ]
        },
        {
          date: new Date('2026-10-23'),
          dayOfWeek: 'Friday',
          lessons: [
            {
              order: 1,
              title: 'Strong Induction',
              description: 'Strong form of mathematical induction',
              lectureLink: {
                url: MIT_6042J_LECTURES.l5,
                title: 'Lecture 5',
                description: 'Strong Induction'
              },
              practiceLink: {
                url: PRACTICE_LINKS.inductionProblems,
                title: 'Strong induction problems',
                description: 'Strong induction exercises'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 5 }
            }
          ]
        },
        {
          date: new Date('2026-10-24'),
          dayOfWeek: 'Saturday',
          lessons: [
            {
              order: 1,
              title: 'Recursion and Dictionaries',
              description: 'Recursive functions and dictionary data structures',
              lectureLink: {
                url: MIT_60001_LECTURES.l6,
                title: 'Lecture 6',
                description: 'Recursion and Dictionaries'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset1,
                title: 'Pset 2 recursion section',
                description: 'Problem Set 2 recursion exercises'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 6 }
            }
          ]
        },
        {
          date: new Date('2026-10-25'),
          dayOfWeek: 'Sunday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'Recursion traces: Hand-trace 3 recursive functions from this week'
        },
        {
          date: new Date('2026-10-26'),
          dayOfWeek: 'Monday',
          lessons: [
            {
              order: 1,
              title: 'Quotient Rule',
              description: 'Differentiating quotients and trigonometric functions',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l6,
                title: 'Lecture 6',
                description: 'Quotient Rule'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Continue Calc practice',
                description: 'Calculus continued practice'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 6 }
            }
          ]
        },
        {
          date: new Date('2026-10-27'),
          dayOfWeek: 'Tuesday',
          lessons: [
            {
              order: 1,
              title: 'Well Ordering',
              description: 'Well-ordering principle and its applications',
              lectureLink: {
                url: MIT_6042J_LECTURES.l6,
                title: 'Lecture 6',
                description: 'Well Ordering'
              },
              practiceLink: {
                url: PRACTICE_LINKS.inductionProblems,
                title: 'Well-ordering exercises',
                description: 'Well-ordering problems'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 6 }
            }
          ]
        }
      ]
    };

    // Week 4: 28 Oct - 03 Nov 2026
    const week4 = {
      weekNumber: 4,
      startDate: new Date('2026-10-28'),
      endDate: new Date('2026-11-03'),
      title: 'Week 4 - Software Engineering & Advanced Topics',
      description: 'OOP, testing, debugging, trig derivatives, number theory',
      totalHours: 15,
      courses: [pythonCourse._id, calcCourse._id, mathCsCourse._id],
      days: [
        {
          date: new Date('2026-10-28'),
          dayOfWeek: 'Wednesday',
          lessons: [
            {
              order: 1,
              title: 'Testing, Debugging, Exceptions',
              description: 'Software quality: testing, debugging, exception handling',
              lectureLink: {
                url: MIT_60001_LECTURES.l7,
                title: 'Lecture 7',
                description: 'Testing, Debugging, Exceptions'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset2,
                title: 'Pset 2 testing + start Pset 3',
                description: 'Problem Set 2 testing, Problem Set 3 start'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 7 }
            }
          ]
        },
        {
          date: new Date('2026-10-29'),
          dayOfWeek: 'Thursday',
          lessons: [
            {
              order: 1,
              title: 'Trig Derivatives',
              description: 'Derivatives of trigonometric functions',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l7,
                title: 'Lecture 7',
                description: 'Trig Derivatives'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Trig derivative exercises',
                description: 'Trigonometric derivative problems'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 7 }
            }
          ]
        },
        {
          date: new Date('2026-10-30'),
          dayOfWeek: 'Friday',
          lessons: [
            {
              order: 1,
              title: 'Number Theory',
              description: 'Foundations of number theory and divisibility',
              lectureLink: {
                url: MIT_6042J_LECTURES.l7,
                title: 'Lecture 7',
                description: 'Number Theory'
              },
              practiceLink: {
                url: PRACTICE_LINKS.inductionProblems,
                title: 'Number theory problems',
                description: 'Number theory exercises'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 7 }
            }
          ]
        },
        {
          date: new Date('2026-10-31'),
          dayOfWeek: 'Saturday',
          lessons: [
            {
              order: 1,
              title: 'Object Oriented Programming',
              description: 'OOP concepts: classes, objects, encapsulation',
              lectureLink: {
                url: MIT_60001_LECTURES.l8,
                title: 'Lecture 8',
                description: 'Object Oriented Programming'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset3,
                title: 'Pset 3 OOP introduction',
                description: 'Problem Set 3 - Object oriented programming'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 8 }
            }
          ]
        },
        {
          date: new Date('2026-11-01'),
          dayOfWeek: 'Sunday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'Mind map W1-W4: Create a one-page visual summary of all key concepts from this term'
        },
        {
          date: new Date('2026-11-02'),
          dayOfWeek: 'Monday',
          lessons: [
            {
              order: 1,
              title: 'Continued - Calculus',
              description: 'Continued calculus topics',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l8,
                title: 'Lecture 8',
                description: 'Calculus continued'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Calc practice',
                description: 'Calculus practice exercises'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 8 }
            }
          ]
        },
        {
          date: new Date('2026-11-03'),
          dayOfWeek: 'Tuesday',
          lessons: [
            {
              order: 1,
              title: 'GCD',
              description: 'Greatest Common Divisor and Euclidean algorithm',
              lectureLink: {
                url: MIT_6042J_LECTURES.l8,
                title: 'Lecture 8',
                description: 'GCD'
              },
              practiceLink: {
                url: PRACTICE_LINKS.gcdProblems,
                title: 'GCD / Euclidean algorithm problems',
                description: 'GCD and Euclidean algorithm exercises'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 8 }
            }
          ]
        }
      ]
    };

    // Week 5: 04-10 Nov 2026
    const week5 = {
      weekNumber: 5,
      startDate: new Date('2026-11-04'),
      endDate: new Date('2026-11-10'),
      title: 'Week 5 - Classes, Inheritance & Modular Arithmetic',
      description: 'Advanced Python OOP, exponential/log derivatives, modular arithmetic',
      totalHours: 12,
      courses: [pythonCourse._id, calcCourse._id, mathCsCourse._id],
      days: [
        {
          date: new Date('2026-11-04'),
          dayOfWeek: 'Wednesday',
          lessons: [
            {
              order: 1,
              title: 'Python Classes and Inheritance',
              description: 'Object-oriented programming: classes, inheritance, polymorphism',
              lectureLink: {
                url: MIT_60001_LECTURES.l9,
                title: 'Lecture 9',
                description: 'Python Classes and Inheritance'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset3,
                title: 'Continue Pset 3 / start Pset 4',
                description: 'Problem Set 3 continued, Problem Set 4 start'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 9 }
            }
          ]
        },
        {
          date: new Date('2026-11-05'),
          dayOfWeek: 'Thursday',
          lessons: [
            {
              order: 1,
              title: 'Exp & Log Derivatives',
              description: 'Derivatives of exponential and logarithmic functions',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l9,
                title: 'Lecture 9',
                description: 'Exp & Log Derivatives'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Exp/log derivative exercises',
                description: 'Exponential and logarithmic derivative problems'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 9 }
            }
          ]
        },
        {
          date: new Date('2026-11-06'),
          dayOfWeek: 'Friday',
          lessons: [
            {
              order: 1,
              title: 'Modular Arithmetic',
              description: 'Arithmetic with modular numbers and applications',
              lectureLink: {
                url: MIT_6042J_LECTURES.l9,
                title: 'Lecture 9',
                description: 'Modular Arithmetic'
              },
              practiceLink: {
                url: PRACTICE_LINKS.inductionProblems,
                title: 'Modular arithmetic problems',
                description: 'Modular arithmetic exercises'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 9 }
            }
          ]
        },
        {
          date: new Date('2026-11-07'),
          dayOfWeek: 'Saturday',
          lessons: [
            {
              order: 1,
              title: 'Program Efficiency Part 1',
              description: 'Algorithmic complexity: time complexity fundamentals',
              lectureLink: {
                url: MIT_60001_LECTURES.l10,
                title: 'Lecture 10',
                description: 'Program Efficiency Part 1'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset4,
                title: 'Pset 4 efficiency questions',
                description: 'Problem Set 4 - efficiency exercises'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 10 }
            }
          ]
        },
        {
          date: new Date('2026-11-08'),
          dayOfWeek: 'Sunday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'Call-stack traces: Trace 3 functions by hand from this week\'s material'
        },
        {
          date: new Date('2026-11-09'),
          dayOfWeek: 'Monday',
          lessons: [
            {
              order: 1,
              title: 'Inverse Functions',
              description: 'Inverse trigonometric and other inverse functions',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l10,
                title: 'Lecture 10',
                description: 'Inverse Functions'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Inverse function exercises',
                description: 'Inverse function problems'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 10 }
            }
          ]
        },
        {
          date: new Date('2026-11-10'),
          dayOfWeek: 'Tuesday',
          lessons: [
            {
              order: 1,
              title: 'Modular Inverses',
              description: 'Finding modular inverses and applications',
              lectureLink: {
                url: MIT_6042J_LECTURES.l10,
                title: 'Lecture 10',
                description: 'Modular Inverses'
              },
              practiceLink: {
                url: PRACTICE_LINKS.inductionProblems,
                title: 'Modular inverse problems',
                description: 'Modular inverse exercises'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 10 }
            }
          ]
        }
      ]
    };

    // Week 6: 11-17 Nov 2026
    const week6 = {
      weekNumber: 6,
      startDate: new Date('2026-11-11'),
      endDate: new Date('2026-11-17'),
      title: 'Week 6 - Efficiency, Sorting & RSA Encryption',
      description: 'Algorithmic complexity, searching/sorting, RSA encryption',
      totalHours: 15,
      courses: [pythonCourse._id, calcCourse._id, mathCsCourse._id],
      days: [
        {
          date: new Date('2026-11-11'),
          dayOfWeek: 'Wednesday',
          lessons: [
            {
              order: 1,
              title: 'Program Efficiency Part 2',
              description: 'Advanced algorithmic complexity analysis',
              lectureLink: {
                url: MIT_60001_LECTURES.l11,
                title: 'Lecture 11',
                description: 'Program Efficiency Part 2'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset4,
                title: 'Finish Pset 4 + start Pset 5',
                description: 'Problem Set 4 complete, Problem Set 5 start'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 11 }
            }
          ]
        },
        {
          date: new Date('2026-11-12'),
          dayOfWeek: 'Thursday',
          lessons: [
            {
              order: 1,
              title: 'Implicit Differentiation',
              description: 'Differentiating implicit functions',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l11,
                title: 'Lecture 11',
                description: 'Implicit Differentiation'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Implicit diff exercises',
                description: 'Implicit differentiation problems'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 11 }
            }
          ]
        },
        {
          date: new Date('2026-11-13'),
          dayOfWeek: 'Friday',
          lessons: [
            {
              order: 1,
              title: "Euler's Theorem",
              description: 'Euler\'s theorem in number theory and cryptography',
              lectureLink: {
                url: MIT_6042J_LECTURES.l11,
                title: 'Lecture 11',
                description: 'Euler\'s Theorem'
              },
              practiceLink: {
                url: PRACTICE_LINKS.rsaProblems,
                title: 'Euler / RSA related problems',
                description: 'Euler\'s theorem and RSA exercises'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 11 }
            }
          ]
        },
        {
          date: new Date('2026-11-14'),
          dayOfWeek: 'Saturday',
          lessons: [
            {
              order: 1,
              title: 'Searching and Sorting',
              description: 'Search algorithms and sorting techniques',
              lectureLink: {
                url: MIT_60001_LECTURES.l12,
                title: 'Lecture 12',
                description: 'Searching and Sorting'
              },
              practiceLink: {
                url: PRACTICE_LINKS.pset5,
                title: 'Pset 5 searching/sorting',
                description: 'Problem Set 5 - searching and sorting'
              },
              duration: 90,
              metadata: { course: '6.0001', lectureNumber: 12 }
            }
          ]
        },
        {
          date: new Date('2026-11-15'),
          dayOfWeek: 'Sunday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'Concept map + pset catch-up: Finish any remaining problem sets from Weeks 1-6'
        },
        {
          date: new Date('2026-11-16'),
          dayOfWeek: 'Monday',
          lessons: [
            {
              order: 1,
              title: 'Log Differentiation',
              description: 'Using logarithms to differentiate complex functions',
              lectureLink: {
                url: MIT_1801SC_LECTURES.l12,
                title: 'Lecture 12',
                description: 'Log Differentiation'
              },
              practiceLink: {
                url: PRACTICE_LINKS.calcPset1,
                title: 'Calc practice',
                description: 'Logarithmic differentiation exercises'
              },
              duration: 90,
              metadata: { course: '18.01SC', lectureNumber: 12 }
            }
          ]
        },
        {
          date: new Date('2026-11-17'),
          dayOfWeek: 'Tuesday',
          lessons: [
            {
              order: 1,
              title: 'RSA Encryption',
              description: 'RSA public-key cryptosystem and its mathematical foundations',
              lectureLink: {
                url: MIT_6042J_LECTURES.l12,
                title: 'Lecture 12',
                description: 'RSA Encryption'
              },
              practiceLink: {
                url: PRACTICE_LINKS.rsaProblems,
                title: 'RSA / number theory problems',
                description: 'RSA and number theory exercises'
              },
              duration: 90,
              metadata: { course: '6.042J', lectureNumber: 12 }
            }
          ]
        }
      ]
    };

    // Week 7: 18-24 Nov 2026 (Midterm Week)
    const week7 = {
      weekNumber: 7,
      startDate: new Date('2026-11-18'),
      endDate: new Date('2026-11-24'),
      title: 'Week 7 - MIDTERM WEEK',
      description: 'Comprehensive midterm exam preparation and exam',
      totalHours: 18,
      courses: [pythonCourse._id, calcCourse._id, mathCsCourse._id],
      days: [
        {
          date: new Date('2026-11-18'),
          dayOfWeek: 'Wednesday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'Midterm Prep - Complete all problem sets under timed conditions'
        },
        {
          date: new Date('2026-11-19'),
          dayOfWeek: 'Thursday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'Midterm Prep - Practice exams for Calculus'
        },
        {
          date: new Date('2026-11-20'),
          dayOfWeek: 'Friday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'Midterm Prep - Practice exams for Mathematics for CS'
        },
        {
          date: new Date('2026-11-21'),
          dayOfWeek: 'Saturday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'Review session: Dictionaries + Calc Rules + Number Theory - Active recall of all formulas and proofs'
        },
        {
          date: new Date('2026-11-22'),
          dayOfWeek: 'Sunday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'MIDTERM EXAM - Timed sitting simulating real exam conditions (no notes allowed)'
        },
        {
          date: new Date('2026-11-23'),
          dayOfWeek: 'Monday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'Light review only - Rest day after midterm'
        },
        {
          date: new Date('2026-11-24'),
          dayOfWeek: 'Tuesday',
          lessons: [],
          isReviewDay: true,
          reviewNotes: 'Light review only - Rest day'
        }
      ]
    };

    // Create the curriculum
    const curriculum = await Curriculum.create({
      title: 'Full Stack Ocean - Ultimate Daily Timetable',
      description: 'Full Stack Ocean of Computer Science - Ultimate Daily Timetable. A comprehensive daily study schedule covering MIT 6.0001 (Python), 18.01SC (Calculus), and 6.042J (Mathematics for Computer Science).',
      version: '1.0.0',
      startDate: new Date('2026-10-07'),
      terms: [
        {
          termNumber: 1,
          title: 'TERM 1 - Foundations I',
          description: 'Foundational courses in programming, calculus, and mathematical thinking',
          startDate: new Date('2026-10-07'),
          endDate: new Date('2027-01-05'),
          isActive: true,
          courses: [pythonCourse._id, calcCourse._id, mathCsCourse._id],
          weeks: [week1, week2, week3, week4, week5, week6, week7]
        }
      ]
    });

    console.log('Curriculum seeded successfully!');
    console.log(`Created curriculum: ${curriculum.title}`);
    console.log(`Total weeks: ${curriculum.terms[0].weeks.length}`);
    
    // Update course references
    await Course.updateMany(
      { _id: { $in: [pythonCourse._id, calcCourse._id, mathCsCourse._id] } },
      { $set: { createdAt: new Date() } }
    );

    return curriculum;

  } catch (error) {
    console.error('Error seeding curriculum:', error.message);
    throw error;
  }
};

module.exports = { seedCurriculum, MIT_60001_LECTURES, MIT_1801SC_LECTURES, MIT_6042J_LECTURES };
// Additional practice links
const PRACTICE_LINKS_EXTENDED = {
  pset2: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
  pset3: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
  pset4: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
  pset5: 'https://ocw.mit.edu/courses/6-0001-understanding-modern-artificial-intelligence-in-python-fall-2023/assignments/',
};