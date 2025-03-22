package com.flightbooking.app.security;

import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
	
	private String secretkey="bcf60ee0555d97962ed3a0d39966c4e32d07a3c317ea2e5fb545a5b524dec9a674357af6eeecec6095589b0c803f32303d6f4fbf06031fd2a9dcd2612e56fd6ddbd9dcce8e2f5f76b2bce5c7a966971b081850ba52cfda4359c760a473676baae5b62dc27171f64580154774d02dfb6635ca5109b3daf385812ee8d428810c7d5a9746668bb1797ac5f1e2772a35d22dac01092423a9b6c3d19213919c0cee2b7d4d1ff8b8f65f93968bac256f00aa326854e8144dd840ce72f2ec2adce6ae1576fc1ec7cc6e5dc8f3c554a9ec74687ddb4949c059e5d92345b171574ae5923f3b9e766f2ceb8006294dd19d4d94165eac1071a0a9340b06e6f0933d83c937a5";
	
	private String secret;
	JWTService()
	{
		secret=generateSecretKey();
	}
	
	String generateSecretKey()
	{
		try
		{
			KeyGenerator keygen=KeyGenerator.getInstance("HmacSHA256");
			SecretKey secretKey=keygen.generateKey();
			return Base64.getEncoder().encodeToString(secretKey.getEncoded());
		}catch (NoSuchAlgorithmException e) {
			throw new RuntimeException("Error While Generating secret key ",e);
		}
		
	}
	
	
	public String generateToken(String userName) {
		
		Map<String, Object> claims=new HashMap<>();
		
		return Jwts.builder()
				.setClaims(claims)
				.subject(userName)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*30))
				.signWith(getKey(),SignatureAlgorithm.HS256).compact();
		
	}

	private Key getKey() {
	byte[] keyBytes=Decoders.BASE64.decode(secret);
		
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String extractUserName(String token) {
		
		
		return extractClaim(token, Claims::getSubject);
	}

	public boolean validateToken(String token, UserDetails userDetails) {
		final String userName=extractUserName(token);
		return (userName.equals(userDetails.getUsername())&&!isTokenExpired(token));
	}
	
	private boolean isTokenExpired(String token) {
		
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		// TODO Auto-generated method stub
		return extractClaim(token, Claims::getExpiration);
	}

	private <T> T extractClaim(String token,Function<Claims,T> claimResolver)
	{
		final Claims claims=extractAllClaims(token);
		return claimResolver.apply(claims);
		
	}

	private Claims extractAllClaims(String token) {
		// TODO Auto-generated method stub
		return Jwts.parser()
				.setSigningKey(getKey())
				.build().parseClaimsJws(token).getBody();
				 
	}
	
	
	

}
