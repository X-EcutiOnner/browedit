uniform sampler2D s_texture;
uniform sampler2D s_textureShadow;
uniform sampler2D s_textureLight;
varying vec2 texCoord;
varying vec2 texCoord2;

varying vec4 color;
varying vec3 normal;
varying vec3 eyeVec;
varying vec3 lightDir;


uniform bool ground;
uniform bool lighting;
uniform bool showFloorShadow;
uniform bool colorOnly;

void main()
{
    vec3 N = normalize(normal);
    vec3 L = normalize(lightDir);
    float nDotVP = dot(N, L);

    float specular = 0.0;

    if (nDotVP > 0.0)
    {
        vec3 E = normalize(eyeVec);
        vec3 R = reflect(-L, N);
        specular =  pow( max(dot(R, E), 0.0), 5.0 );
    }

    float ambient = 0.5;
    float diffuse = 0.5 * max(0.0, nDotVP);
    specular = 0.0;
    
    vec4 col;
    
    if(colorOnly)
    	col = color; 
    else if(ground && showFloorShadow)
	    col = (texture2D(s_texture, texCoord)+texture2D(s_textureLight, texCoord2)) * texture2D(s_textureShadow, texCoord2);
	else
	    col = texture2D(s_texture, texCoord);
	
	
	if(col.w < 0.9)
		discard;
		
			
	vec4 lightedCol;
	if(lighting && !colorOnly)
	{
		lightedCol = (ambient + specular + diffuse) * col;
		lightedCol.w = col.w;
	}
	else
		lightedCol = col;
	

    if(ground)
    {
	    lightedCol.x = lightedCol.x * color.x;
	    lightedCol.y = lightedCol.y * color.y;
	    lightedCol.z = lightedCol.z * color.z;
	}    
    
    //if(col.w > 0.9)
    //	lightedCol = vec4(normal,1);
    
    gl_FragColor = lightedCol;
}