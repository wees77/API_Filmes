CREATE TABLE tbl_filme(
	id				int PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome			varchar(100) NOT NULL,
	sinopse			text NULL,
	data_lancamento	date NULL,
	duracao			time NOT NULL,
	orcamento		decimal(11,2) NOT NULL,
	trailer			varchar(200) NULL,
	capa			varchar(200) NOT NULL
	);
	
INSERT into tbl_filme ( nome, sinopse, data_lancamento,
						duracao, orcamento, trailer, capa)
						values ("Viagem ao Centro da Terra - O Filme",
								"Em Viagem ao Centro da Terra - O Filme, 
								Trevor Anderson (Brendan Fraser) é um cientista 
								cujas teorias não são bem aceitas pela comunidade 
								científica. Decidido a descobrir o que aconteceu 
								com seu irmão Max, que simplesmente desapareceu, 
								ele parte para a Islândia juntamente com seu sobrinho 
								Sean (Josh Hutcherson) e a guia Hannah. Entretanto 
								em meio à expedição eles ficam presos em uma caverna e, 
								na tentativa de deixar o local, alcançam o centro da Terra.
								Lá eles encontram um exótico e desconhecido mundo perdido.",
								"2008-07-11",
								"1:32",
								6000000,
								"https://www.adorocinema.com/filmes/filme-111381/",
								"https://m.media-amazon.com/images/M/MV5BYzc2MDExMDUtN2RkMy00NjY4LWIzY2UtMGU2MjhiYWEyMzkwXkEyXkFqcGc@._V1_.jpg");

INSERT into tbl_filme ( nome, sinopse, data_lancamento,
						duracao, orcamento, trailer, capa)
						values ("Harry Potter e o Enigma do Príncipe",
						"Lorde Voldemort (Ralph Fiennes) é uma ameaça real, 
						tanto para o mundo dos bruxos quanto o dos trouxas. 
						Harry Potter (Daniel Radcliffe) suspeita que o perigo 
						esteja dentro da Escola de Magia e Bruxaria de Hogwarts, 
						mas Alvo Dumbledore (Michael Gambon) está mais preocupado 
						em prepará-lo para o confronto final com o Lorde das Trevas. 
						Dumbledore convida seu colega Horácio Slughorn (Jim Broadbent) 
						para ser o novo professor de Poções, já que Severo Snape (Alan Rickman) 
						enfim alcançou o sonho de ministrar as aulas de Defesa Contra as Artes 
						das Trevas. Paralelamente Harry começa a ter um interesse cada vez maior 
						por Gina Weasley (Bonnie Wright), irmã de seu melhor amigo Rony (Rupert Grint), 
						que também é alvo de interesse de Dino Thomas (Alfie Enoch).",
						"2009-07-15",
						"2:33",
						250000000,
						"https://www.adorocinema.com/filmes/filme-116305/",
						"https://m.media-amazon.com/images/M/MV5BYWFjMjkyZTQtZWZiZS00NzE0LWFkOTktNDQ1YzRlNTIxMDhlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg");