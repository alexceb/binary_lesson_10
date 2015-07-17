describe('Man in this world', function() {

	var man;

	it('only accepts <string> as a name and <number> as an age otherwise it throw an error', function() {

		expect(function() {
			man = new Man("abc", -2);
		}).toThrowError('Invalid parameters: "age" must be a positive number!');

		expect(function() {
			man = new Man("abc", "cba");
		}).toThrowError('Invalid parameters: "age" must be a positive number!');

		expect(function() {
			man = new Man(10, 20);
		}).toThrowError('Invalid parameters: "name" must be a string!');

	});

	it('should have a "name" and an "age" property when initialized with them', function() {
		man = new Man('Alex', 26);
		expect(man.name).toBe('Alex');
		expect(man.age).toBe(26);
	});

});

describe('A student is living creature that', function() {
	var student = new Student('Alex', 26);

	it('inherits from Man() constructor gaining its prototype', function() {
		expect(student.__proto__ instanceof Man).toBeTruthy();
	});

	describe('can ask proffesor about anything', function() {
		var proffesor = new Proffesor('Dr. John', 52, 100);

		it('you recieve an error if proffesor is busy', function() {
			expect(function() {
				proffesor.teach();
				student.askProffesorAbout(proffesor, 'world');
			}).toThrowError("You can't ask proffesor while he's busy!");
		});

		it('or will get the answer', function() {
			proffesor.gotThingsDone();
			proffesor.study({ name: 'js', desc: 'about js'});
			expect(student.askProffesorAbout(proffesor, 'JS'))
				.toBe('You listening carefully to proffesor gaining an answer you need');
		});

		it('...otherwise proffesor won"t help you if he doesn"t know about that', function() {
			expect(student.askProffesorAbout(proffesor, 'React'))
				.toBe("Proffesor doesn't know about that!");
		});
	});
});

describe('Proffesor is a human being that', function() {
	var proffesor = new Proffesor('Dr. John', 52, 100), 
		initialLvl = proffesor._expLvl,
		initialKnowledgeAmount = proffesor._knowledge.length;

	describe('has properties', function() {
		it('"LVL" that show its experience', function() {
			expect(proffesor.hasOwnProperty('_expLvl')).toBeTruthy();
		})

		it("'KNOWLEDGE' that is an Array", function() {
			expect(proffesor.hasOwnProperty('_knowledge')).toBeTruthy();
			expect(proffesor._knowledge instanceof Array).toBeTruthy();
		});
	});

	describe('has such behavior', function() {
		it('inherits from Student() constructor gaining its prototype', function() {
			expect(proffesor.__proto__ instanceof Student).toBeTruthy();
		});

		it('throws an error if the added knowledge has not proper fields', function() {
			expect(function() {
				proffesor.study('computer science');
			}).toThrowError('The model of added knowledge must be { name: "its name", desc: "its description"}! ');
		});

		it('searching what prof knows is case insensitive', function() {
			proffesor.study({ name: 'Angular', desc: 'about Angular'});
			expect(proffesor.knows('AnGuLaR')).toBeTruthy();
		});

		it("return true when he's asked about he already knows", function() {
			proffesor.study({ name: 'Jade', desc: 'about Jade'});
			expect(proffesor.knows('jade')).toBeTruthy();
		});

		it('can"t learn new things while he"s busy - get an error', function() {
			proffesor.teach();
			expect(function() {
				proffesor.study({ name: 'something', desc: 'about something'})
			}).toThrowError("Can't study new - i'm busy!");
		});

		it('can level up while learning new things', function() {
			proffesor.gotThingsDone();
			proffesor.study({ name: 'Algorithms', desc: 'about Algorithms'});
			expect(proffesor._expLvl).toBeGreaterThan(initialLvl);
		});

		it('extends its knowledge while learning', function() {
			proffesor.study({ name: 'css', desc: 'about css'});
			expect(proffesor._knowledge.length).toBeGreaterThan(initialKnowledgeAmount);
		});
	});
	
});