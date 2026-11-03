// The "Great Readings" shelf — transcribed from the computer-science repo's
// extras/readings.md (OSSU). Every book from the file is included.

module.exports = {
  books: [
    // ---- Programming ----
    { title: 'Introduction to Computation and Programming Using Python 3e', authors: 'John V. Guttag', url: 'https://mitpress.mit.edu/books/introduction-computation-and-programming-using-python-third-edition', category: 'Programming', order: 1 },
    { title: 'Think Python 2e', authors: 'Allen B. Downey', url: 'http://greenteapress.com/wp/think-python-2e/', localSrc: '/books/thinkpython2.pdf', category: 'Programming', order: 2 },
    { title: 'How to Design Programs 2e', authors: 'Matthias Felleisen, Robert Bruce Findler, Matthew Flatt, Shriram Krishnamurthi', url: 'https://www.htdp.org/', category: 'Programming', order: 3 },
    { title: 'Structure and Interpretation of Computer Programs 2e', authors: 'Hal Abelson, Jerry Sussman, Julie Sussman', url: 'https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book.html', localSrc: '/books/sicp/full-text/book/book-Z-H-1.html', category: 'Programming', order: 4 },
    { title: 'The Structure and Interpretation of Computer Programs (2021, JavaScript)', authors: 'Harold Abelson, Gerald Jay Sussman, Julie Sussman, Martin Henz, Tobias Wrigstad', url: 'https://sourceacademy.org/sicpjs/index', category: 'Programming', order: 5 },
    { title: 'Concepts, Techniques, and Models of Computer Programming', authors: 'Peter Van Roy, Seif Haridi', url: 'https://www.amazon.com/gp/product/0262220695', category: 'Programming', order: 6 },
    { title: 'Design Patterns: Elements of Reusable Object-Oriented Software', authors: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides', url: 'https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612', category: 'Programming', order: 7 },
    { title: 'Refactoring', authors: 'Martin Fowler', url: 'https://www.refactoring.com/', category: 'Programming', order: 8 },
    { title: 'Clean Code', authors: 'Robert Martin', url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882', category: 'Programming', order: 9 },
    { title: 'Code Complete 2e', authors: 'Steve McConnell', url: 'https://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670', category: 'Programming', order: 10 },
    { title: 'The Pragmatic Programmer 2e', authors: 'Andrew Hunt, David Thomas', url: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/', category: 'Programming', order: 11 },
    { title: 'Programming Languages: Application and Interpretation', authors: 'Shriram Krishnamurthi', url: 'http://cs.brown.edu/~sk/Publications/Books/ProgLangs/', category: 'Programming', order: 12 },
    { title: 'Programming and Programming Languages', authors: 'Shriram Krishnamurthi, Benjamin S. Lerner, Joe Gibbs Politz', url: 'https://papl.cs.brown.edu/2018/', category: 'Programming', order: 13 },
    { title: 'Competitive Programming', authors: 'Steven Halim, Felix Halim', url: 'https://cpbook.net/', category: 'Programming', order: 14 },
    { title: 'Introduction to computing in Java', authors: 'Robert Sedgewick, Kevin Wayne', url: 'https://introcs.cs.princeton.edu/java/home/', category: 'Programming', order: 15 },

    // ---- Math ----
    { title: 'Calculus Made Easy', authors: 'Silvanus P. Thompson', url: 'http://www.gutenberg.org/ebooks/33283', category: 'Math', order: 1 },
    { title: 'Ximera: Interactive Calculus Textbooks', authors: 'Ximera team', url: 'https://ximera.osu.edu/', category: 'Math', order: 2 },
    { title: 'Discrete Mathematics with Applications (4th Edition)', authors: 'Susanna S. Epp', url: 'http://www.amazon.com/Discrete-Mathematics-Applications-Susanna-Epp/dp/0495391328/', category: 'Math', order: 3 },
    { title: 'Discrete Mathematics: An Open Introduction', authors: 'Oscar Levin', url: 'https://discrete.openmathbooks.org/dmoi4/frontmatter.html', category: 'Math', order: 4 },
    { title: 'Applied Discrete Structures', authors: 'Alan Doerr, Ken Levasseur', url: 'http://faculty.uml.edu/klevasseur/ads2/', category: 'Math', order: 5 },
    { title: "Grinstead and Snell's Introduction to Probability", authors: 'Charles M. Grinstead, J. Laurie Snell', url: 'https://math.dartmouth.edu/~prob/prob/prob.pdf', category: 'Math', order: 6 },
    { title: 'Linear Algebra for Everyone', authors: 'Gilbert Strang', url: 'https://math.mit.edu/~gs/everyone/', category: 'Math', order: 7 },
    { title: 'The Art of Linear Algebra', authors: 'Kenji Hiranabe, Gilbert Strang', url: 'https://github.com/kenjihiranabe/The-Art-of-Linear-Algebra', category: 'Math', order: 8 },

    // ---- Systems ----
    { title: 'But How Do It Know?', authors: 'J. Clark Scott', url: 'http://www.buthowdoitknow.com/', category: 'Systems', order: 1 },
    { title: "Computer Systems: A Programmer's Perspective (3rd Edition)", authors: "Randal E. Bryant, David R. O'Hallaron", url: 'http://csapp.cs.cmu.edu/', category: 'Systems', order: 2 },
    { title: 'Modern Operating Systems (4th Edition)', authors: 'Andrew S. Tanenbaum, Herbert Bos', url: 'http://www.amazon.com/Modern-Operating-Systems-Andrew-Tanenbaum/dp/013359162X/', category: 'Systems', order: 3 },
    { title: 'Computer Organization and Design: The Hardware/Software Interface (6th Edition)', authors: 'David Patterson, John Hennessy', url: 'https://www.amazon.com/Computer-Organization-Design-MIPS-Architecture/dp/0128201096/', category: 'Systems', order: 4 },
    { title: 'Computer Networks (5th Edition)', authors: 'Andrew S. Tanenbaum, David J. Wetherall', url: 'http://www.amazon.com/Computer-Networks-5th-Andrew-Tanenbaum/dp/0132126958/', category: 'Systems', order: 5 },
    { title: 'Computer Networking: A Top-Down Approach (8th Edition)', authors: 'James F Kurose, Keith W Ross', url: 'https://gaia.cs.umass.edu/kurose_ross/index.html', localSrc: '/books/ostep.pdf', note: 'In-app PDF currently points at the OSTEP book — kept from the original shelf.', category: 'Systems', order: 6 },
    { title: 'Computer Networks: A Systems Approach', authors: 'Larry Peterson and Bruce Davie', url: 'https://book.systemsapproach.org/', category: 'Systems', order: 7 },
    { title: 'Distributed Systems: Principles and Paradigms', authors: 'Andrew Tanenbaum', url: 'https://www.amazon.com/Distributed-Systems-Principles-Andrew-Tanenbaum/dp/153028175X', category: 'Systems', order: 8 },
    { title: 'Operating Systems Design and Implementation', authors: 'Andrew S. Tanenbaum, Albert S. Woodhull', url: 'https://www.amazon.com/Operating-Systems-Design-Implementation-3rd/dp/0131429388', category: 'Systems', order: 9 },
    { title: 'Crafting Interpreters', authors: 'Robert Nystrom', url: 'https://www.craftinginterpreters.com/contents.html', category: 'Systems', order: 10 },
    { title: 'Principles of Compiler Design', authors: 'Alfred Aho, Jeffrey Ullman', url: 'https://www.amazon.com/Principles-Compiler-Addison-Wesley-information-processing/dp/0201000229', category: 'Systems', order: 11 },
    { title: 'Distributed Systems Reading Group', authors: 'Various', url: 'http://dsrg.pdos.csail.mit.edu/papers/', category: 'Systems', order: 12 },
    { title: 'System Design: Design large-scale systems', authors: 'Various', url: 'https://github.com/donnemartin/system-design-primer', category: 'Systems', order: 13 },
    { title: 'Code: The Hidden Language of Computer Hardware and Software', authors: 'Charles Petzold', url: 'https://codehiddenlanguage.com/Chapter00/', category: 'Systems', order: 14 },

    // ---- Theory ----
    { title: 'Introduction to Computing: Explorations in Language, Logic, and Machines', authors: 'David Evans', url: 'http://www.computingbook.org/', category: 'Theory', order: 1 },
    { title: 'Introduction to the Theory of Computation (3rd Edition)', authors: 'Michael Sipser', url: 'https://www.amazon.com/Introduction-Theory-Computation-Michael-Sipser/dp/113318779X', category: 'Theory', order: 2 },
    { title: 'Introduction to Algorithms (3rd Edition)', authors: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein', url: 'http://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844/', category: 'Theory', order: 3 },
    { title: 'The Algorithm Design Manual (3rd Edition)', authors: 'Steven Skiena', url: 'https://www.algorist.com/', category: 'Theory', order: 4 },
    { title: 'Algorithms (4th Edition)', authors: 'Robert Sedgewick', url: 'https://algs4.cs.princeton.edu/home/', category: 'Theory', order: 5 },
    { title: 'Algorithms Illuminated', authors: 'Tim Roughgarden', url: 'https://algorithmsilluminated.org/', category: 'Theory', order: 6 },
    { title: 'Category Theory: A Gentle Introduction', authors: 'Peter Smith', url: 'http://www.logicmatters.net/resources/pdfs/GentleIntro.pdf', category: 'Theory', order: 7 },
    { title: 'Category Theory for Programmers: The Preface', authors: 'Bartosz Milewski', url: 'https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/', category: 'Theory', order: 8 },
    { title: 'An Introduction to Information Retrieval', authors: 'Christopher D. Manning, Prabhakar Raghavan, Hinrich Schütze', url: 'https://nlp.stanford.edu/IR-book/pdf/irbookonlinereading.pdf', category: 'Theory', order: 9 },
    { title: 'Computer Science: An interdisciplinary approach', authors: 'Robert Sedgewick, Kevin Wayne', url: 'https://introcs.cs.princeton.edu/java/cs/', category: 'Theory', order: 10 },
    { title: 'DSA CS3: Data Structures & Algorithms', authors: 'The OpenDSA Project', url: 'https://opendsa-server.cs.vt.edu/OpenDSA/Books/CS3/html/', note: 'Coursenotes and slides also available from the same project.', category: 'Theory', order: 11 },

    // ---- Applications ----
    { title: 'Architecture of a Database System', authors: 'Joseph M. Hellerstein, Michael Stonebraker, James Hamilton', url: 'http://db.cs.berkeley.edu/papers/fntdb07-architecture.pdf', category: 'Applications', order: 1 },
    { title: 'Readings in Database Systems (5th Edition)', authors: 'Peter Bailis, Joseph M. Hellerstein, Michael Stonebraker (editors)', url: 'http://www.redbook.io/', category: 'Applications', order: 2 },
    { title: 'Database Management Systems (3rd Edition)', authors: 'Raghu Ramakrishnan, Johannes Gehrke', url: 'https://www.amazon.com/gp/product/0072465638', category: 'Applications', order: 3 },
    { title: 'Transaction Processing: Concepts and Techniques', authors: 'Jim Gray, Andreas Reuter', url: 'https://www.amazon.com/Transaction-Processing-Concepts-Techniques-Management/dp/1558601902', category: 'Applications', order: 4 },
    { title: 'Data and Reality (3rd Edition)', authors: 'William Kent', url: 'https://www.amazon.com/Data-Reality-Perspective-Perceiving-Information/dp/1935504215', category: 'Applications', order: 5 },
    { title: 'The Architecture of Open Source Applications', authors: 'Michael DiBernardo (editor)', url: 'http://aosabook.org/en/', category: 'Applications', order: 6 },
    { title: 'An Introduction to Statistical Learning', authors: 'Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani', url: 'https://www-bcf.usc.edu/~gareth/ISL/', category: 'Applications', order: 7 },
    { title: 'Deep Learning', authors: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', url: 'http://www.deeplearningbook.org/', category: 'Applications', order: 8 },
    { title: 'Bayesian Reasoning and Machine Learning', authors: 'David Barber', url: 'http://web4.cs.ucl.ac.uk/staff/D.Barber/pmwiki/pmwiki.php?n=Brml.HomePage', category: 'Applications', order: 9 },
    { title: 'Language Implementation Patterns', authors: 'Terence Parr', url: 'https://www.amazon.com/gp/product/193435645X', category: 'Applications', order: 10 },
    { title: 'Compilers: Principles, Techniques, and Tools (2nd Edition)', authors: 'Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman', url: 'http://www.amazon.com/Compilers-Principles-Techniques-Tools-2nd/dp/0321486811/', category: 'Applications', order: 11 },
    { title: 'Compiler Construction', authors: 'Niklaus Wirth', url: 'https://inf.ethz.ch/personal/wirth/CompilerConstruction/index.html', category: 'Applications', order: 12 },
    { title: 'The Mythical Man-Month', authors: 'Fred Brooks, Jr.', url: 'https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959/', category: 'Applications', order: 13 },
    { title: 'Physically Based Rendering: From Theory To Implementation', authors: 'Matt Pharr, Wenzel Jakob, Greg Humphreys', url: 'http://www.pbr-book.org/', category: 'Applications', order: 14 },

    // ---- Tools ----
    { title: 'The Linux Command Line', authors: 'William Shotts', url: 'https://linuxcommand.org/tlcl.php', localSrc: '/books/xv6-book-rev11.pdf', note: 'In-app PDF currently points at the xv6 book — kept from the original shelf.', category: 'Tools', order: 1 }
  ]
};
