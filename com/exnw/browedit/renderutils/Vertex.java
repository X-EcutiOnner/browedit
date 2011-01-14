package com.exnw.browedit.renderutils;

import java.nio.FloatBuffer;

public interface Vertex
{
	public int getSize();
	public void fillBuffer(FloatBuffer buffer, int offset);
	public void setPointers(Vbo vbo);
}
