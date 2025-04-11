import React from "react";

const openLink = (url) => {
    window.open(url, "_blank");
};


export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<p>
			Made with <i className="fa fa-heart text-danger" /> by{" "}
			<p></p>
			<h4>
				<a
					href="https://github.com/hectormillan"
					target="_blank"
				
				
				>
					Héctor Millán
				</a>
			</h4>
			

			<h4>
				<a
					href="https://github.com/AnnieyG"
					target="_blank"
					
					
				>
					Annie Góngora
				</a>
			</h4>


			<h4>
				<a
					href="https://github.com/Lawerence9"
					target="_blank"
				
				
				>
					Álvaro Jiménez
				</a>
			</h4>
		
			
		 {/*	<a href="http://www.4geeksacademy.com">4Geeks Academy</a> */}
		</p>

		
	</footer>
);
