/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *  http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License. 
 */

package org.kie.lienzo.client.util;

import com.ait.lienzo.client.core.shape.Shape;
import com.ait.lienzo.client.core.types.Point2DArray;

public class Util {

    public static final double generateValueWithinBoundary(int maxValue, int safeValue) {

        double value = Math.random() * maxValue;

        if (value < safeValue) {
            value = safeValue;
        }
        if (value > (maxValue - safeValue)) {
            value = maxValue - safeValue;
        }
        return value;
    }

    public static final double[] getRandomLocation(Shape shape,
                                                   int viewWidth, int viewHeight,
                                                   int leftPadding, int topPadding, int rightPadding, int bottomPadding) {
        // this is needed as some shapes, like circles and multipaths, won't have same x,y result as rectangle
        Point2DArray points = shape.getBoundingPoints().getArray();
        double xOffset = points.get(0).getX() - shape.getX();
        double yOffset = points.get(0).getY() - shape.getY();

        double shapeWidth = points.get(1).getX() - points.get(0).getX();
        double shapeHeight = points.get(3).getY() - points.get(0).getY();

        double wRange = viewWidth - leftPadding - rightPadding - shape.getStrokeWidth() - shapeWidth;
        double hRange = viewHeight - topPadding - bottomPadding - shape.getStrokeWidth() - shapeHeight;

        double x = Math.random() * wRange;
        double y = Math.random() * hRange;

        x = x + leftPadding + shape.getStrokeWidth() - xOffset;
        y = y + topPadding + shape.getStrokeWidth() - yOffset;

        return new double[]{x, y};
    }

    public static final void setLocation(Shape shape,
                                         int viewWidth, int viewHeight,
                                         int leftPadding, int topPadding, int rightPadding, int bottomPadding) {

        // this is needed as some shapes, like circles and multipaths, won't have same x,y result as rectangle
        Point2DArray points = shape.getBoundingPoints().getArray();
        double xOffset = points.get(0).getX() - shape.getX();
        double yOffset = points.get(0).getY() - shape.getY();

        double shapeWidth = points.get(1).getX() - points.get(0).getX();
        double shapeHeight = points.get(3).getY() - points.get(0).getY();

        double wRange = viewWidth - leftPadding - rightPadding - shape.getStrokeWidth() - shapeWidth;
        double hRange = viewHeight - topPadding - bottomPadding - shape.getStrokeWidth() - shapeHeight;

        double x = Math.random() * wRange;
        double y = Math.random() * hRange;

        x = x + leftPadding + shape.getStrokeWidth() - xOffset;
        y = y + topPadding + shape.getStrokeWidth() - yOffset;

        shape.setX(x).setY(y);
    }

    public static final int randomNumber(int value, double factor) {
        return (int) ((Math.random() * factor) * value);
    }

    /**
     * @param a
     * @param b
     * @return a <= random number < b
     */
    public static final int randomIntBetween(int a, int b) {
        return (int) (a + Math.random() * (b - a));
    }

    public static final double randomDoubleBetween(double a, double b) {
        return (a + Math.random() * (b - a));
    }

    public static final <T> T randomValue(T[] values) {
        return values[randomIntBetween(0, values.length)];
    }
}
